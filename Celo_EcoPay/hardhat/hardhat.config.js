require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.17",
  networks: {
    alfajores: {
      // use ALFAJORES_RPC_URL (matches .env.local) for clarity
      url: process.env.ALFAJORES_RPC_URL || process.env.ALFajORES_RPC_URL || "https://alfajores-forno.celo-testnet.org",
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : []
    }
  },
};
