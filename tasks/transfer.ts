import { task } from "hardhat/config";
// import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "hardhat-gas-reporter";
// import "solidity-coverage";
import "@nomiclabs/hardhat-web3";


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