import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import "@nomiclabs/hardhat-web3";
import { ethers } from "hardhat";

chai.use(solidity);

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("transfer", "Transfers token from your account to another")
.addParam("recaddress", "Account to which tokens are being sent to")
.addParam("amount", "Amount to transfer")
.setAction(async (taskArgs,hre) => {
  const [sender, secondaccount, thirdaccount, fourthaccount] = await hre.ethers.getSigners();
  const IkhlasToken = await hre.ethers.getContractFactory("IkhlasToken");
  const ikhlasToken = await IkhlasToken.deploy();
  await ikhlasToken.deployed();

  let output = await ikhlasToken.connect(sender).transfer(taskArgs.recaddress, taskArgs.amount);

console.log(await output);
});

task("approve", "Approve tokens to be transferred from your account by another account upto value amount")
.addParam("recaddress", "Account to be given permission")
.addParam("amount", "Maximum value")
.setAction(async (taskArgs,hre) => {
  const [sender, secondaccount, thirdaccount, fourthaccount] = await hre.ethers.getSigners();
  const IkhlasToken = await hre.ethers.getContractFactory("IkhlasToken");
  const ikhlasToken = await IkhlasToken.deploy();
  await ikhlasToken.deployed();

  let output = await ikhlasToken.connect(sender).approve(taskArgs.recaddress, taskArgs.amount);

console.log(await output);
});

task("transferfrom", "Approve tokens to be transferred from your account by another account upto value amount")
.addParam("sendaddress", "Account to send tokens")
.addParam("recaddress", "Account to receive tokens")
.addParam("amount", "Tokens to be transferred")
.setAction(async (taskArgs,hre) => {
  const [sender, secondaccount, thirdaccount, fourthaccount] = await hre.ethers.getSigners();
  const IkhlasToken = await hre.ethers.getContractFactory("IkhlasToken");
  const ikhlasToken = await IkhlasToken.deploy();
  await ikhlasToken.deployed();

  let output = await ikhlasToken.connect(sender).transferFrom(taskArgs.sendaddress,taskArgs.recaddress, taskArgs.amount);

console.log(await output);
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
