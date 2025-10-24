const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PhoneMapping", function () {
  let PhoneMapping, phoneMapping, owner, other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    PhoneMapping = await ethers.getContractFactory("PhoneMapping");
    phoneMapping = await PhoneMapping.deploy();
    await phoneMapping.deployed();
  });

  it("registers and retrieves a wallet by phone hash", async function () {
    const phone = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("+15551234567"));
    await expect(phoneMapping.registerPhone(phone))
      .to.emit(phoneMapping, "PhoneRegistered")
      .withArgs(phone, owner.address);

    const wallet = await phoneMapping.getWallet(phone);
    expect(wallet).to.equal(owner.address);
  });

  it("rejects zero hash", async function () {
    await expect(phoneMapping.registerPhone(ethers.constants.HashZero)).to.be.revertedWith("invalid hash");
  });
});
