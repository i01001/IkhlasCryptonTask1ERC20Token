import { task } from "hardhat/config";
// import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
// import "@typechain/hardhat";
// import "hardhat-gas-reporter";
// import "solidity-coverage";
import "@nomiclabs/hardhat-web3";

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
  