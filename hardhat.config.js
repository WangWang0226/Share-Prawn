require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("dotenv").config();

const {ALCHEMY_API_KEY, NODE_BASE_URL} = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: `${NODE_BASE_URL}${ALCHEMY_API_KEY}`,
        blockNumber:16182521,
        enable: true
      }
    }
  }
};