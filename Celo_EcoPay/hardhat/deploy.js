const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with", deployer.address);

  // Deploy PhoneMapping
  const PhoneMapping = await hre.ethers.getContractFactory("PhoneMapping");
  const phoneMapping = await PhoneMapping.deploy();
  await phoneMapping.deployed();
  console.log("PhoneMapping deployed to:", phoneMapping.address);

  // Set ecoFund address to deployer for now, change later
  const ecoFund = process.env.ECO_FUND_ADDRESS || deployer.address;

  const PaymentContract = await hre.ethers.getContractFactory("PaymentContract");
  const payment = await PaymentContract.deploy(ecoFund);
  await payment.deployed();
  console.log("PaymentContract deployed to:", payment.address);

  console.log("Done");
}

main()
  .then(()=>process.exit(0))
  .catch(e=>{console.error(e); process.exit(1);});
