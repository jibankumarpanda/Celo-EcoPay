const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentContract", function () {
  let PaymentContract, paymentContract, owner, ecoFund, receiver;

  beforeEach(async function () {
    [owner, ecoFund, receiver] = await ethers.getSigners();
    PaymentContract = await ethers.getContractFactory("PaymentContract");
    paymentContract = await PaymentContract.deploy(ecoFund.address);
    await paymentContract.deployed();
  });

  it("sets ecoFund on construction", async function () {
    expect(await paymentContract.ecoFund()).to.equal(ecoFund.address);
  });

  it("splits payment: 99% to receiver, 1% to ecoFund", async function () {
    const sendAmount = ethers.utils.parseEther("1.0"); // 1 CELO

    const initialReceiverBalance = await ethers.provider.getBalance(receiver.address);
    const initialEcoBalance = await ethers.provider.getBalance(ecoFund.address);

    // owner sends payment through the contract
    await expect(owner.sendTransaction({
      to: paymentContract.address,
      value: sendAmount,
      data: paymentContract.interface.encodeFunctionData("sendPayment", [receiver.address])
    }))
      .to.emit(paymentContract, "PaymentSent");

    const donation = sendAmount.div(100);
    const amountToSend = sendAmount.sub(donation);

    const finalReceiverBalance = await ethers.provider.getBalance(receiver.address);
    const finalEcoBalance = await ethers.provider.getBalance(ecoFund.address);

    expect(finalReceiverBalance.sub(initialReceiverBalance)).to.equal(amountToSend);
    expect(finalEcoBalance.sub(initialEcoBalance)).to.equal(donation);
  });

  it("reverts on zero amount", async function () {
    await expect(paymentContract.connect(owner).sendPayment(receiver.address, { value: 0 })).to.be.revertedWith("zero amount");
  });
});
