import { IkhlasToken__factory } from './../typechain/factories/IkhlasToken__factory';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "chai";
import { BigNumber } from "ethers";

describe("Checking if initial values are correct", function () {
  
  // beforeEach (async () => {
  //   const signers = await ethers.getSigners();
      // });

  it("Should return the defined symbol, name and decimals for the token", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken._symbol()).to.equal("IKH1");
    expect(await ikhlasToken._name()).to.equal("Ikhlas NEW coin");
    expect(await ikhlasToken._decimals()).to.equal(18);
  });

  it("Should return the name with the name function", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken.name()).to.equal("Ikhlas NEW coin");
  });

  it("Should return the symbol with the symbol function", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken.symbol()).to.equal("IKH1");
  });

  it("Should return the decimal with the decimal function", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken.decimals()).to.equal(18);
  });

  it("Should return the total supply with the total supply function", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken.totalSupply()).to.equal(1000000*10**18);
  });





});
