import { IkhlasToken__factory } from './../typechain/factories/IkhlasToken__factory';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from "chai";
import { ethers } from "hardhat";
import { assert } from "chai";
import { BigNumber } from "ethers";

describe("Checking if initial values are correct", function () {
  
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
    expect(await ikhlasToken.totalSupply()).to.be.equal(ethers.utils.parseUnits("1", 24));
  });

  // it("Should return the correct value with the add function", async function () {
  //   const signers = await ethers.getSigners();
  //   const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
  //   expect(await ikhlasToken.add((ethers.utils.parseUnits("1", 21)),(ethers.utils.parseUnits("2", 21)))).to.be.equal(ethers.utils.parseUnits("3", 21));
  // });
  
  // it("Should return the correct value with the sub function", async function () {
  //   const signers = await ethers.getSigners();
  //   const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
  //   expect(await ikhlasToken.sub((ethers.utils.parseUnits("3", 21)),(ethers.utils.parseUnits("1", 21)))).to.be.equal(ethers.utils.parseUnits("2", 21));
  // });

  // it("Should ensure the require of sub function is being met", async function () {
  //   const signers = await ethers.getSigners();
  //   const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
  //   let inputa = await ethers.utils.parseUnits("2", 21);
  //   let inputb = await ethers.utils.parseUnits("1", 21);
  //   await expect(ikhlasToken.sub(inputb,inputa)).to.be.revertedWith("error");
  // });

  it("Should return the correct balanceof with the balanceof function", async function () {
    const signers = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers[0]).deploy();
    expect(await ikhlasToken.balanceOf(signers[0].address)).to.be.equal(ethers.utils.parseUnits("1", 24));
  });

  it("Should increase the approve with the approve function", async function () {
    const [signers, second] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    expect(await ikhlasToken.connect(signers).approve(second.address, (ethers.utils.parseUnits("1", 20)))).to.emit(ikhlasToken, "Approval").withArgs(signers.address, second.address, (ethers.utils.parseUnits("1", 20)));
  });

  it("Should transfer the tokens with the transfer function", async function () {
    const [signers, second] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    expect(await ikhlasToken.connect(signers).transfer(second.address, (ethers.utils.parseUnits("1", 20)))).to.emit(ikhlasToken, "Transfer").withArgs(signers.address, second.address, (ethers.utils.parseUnits("1", 20)));
  });
  
  it("Should transfer the tokens with the transferfrom function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    await ikhlasToken.connect(signers).approve(second.address, (ethers.utils.parseUnits("1", 20)));
    expect(await ikhlasToken.connect(second).transferFrom(signers.address, third.address, (ethers.utils.parseUnits("1", 20)))).to.emit(ikhlasToken, "Transfer").withArgs(signers.address, third.address, (ethers.utils.parseUnits("1", 20)));
  });

  it("Should display the allowance with the Allowance function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    await ikhlasToken.connect(signers).approve(second.address, (ethers.utils.parseUnits("1", 20)));
    expect(await ikhlasToken.connect(second).allowance(signers.address, second.address)).to.be.equal(ethers.utils.parseUnits("1", 20));
  });

  it("Should not allow non-owner to run the mint function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    await expect (ikhlasToken.connect(second).mint(second.address, (ethers.utils.parseUnits("1", 20)))).to.be.revertedWith('This transaction can only be carried out by owner!');
  });

  it("Should allow owner to run the mint function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    expect (await ikhlasToken.connect(signers).mint(second.address, (ethers.utils.parseUnits("1", 20)))).to.emit(ikhlasToken, "Transfer").withArgs('0x0000000000000000000000000000000000000000', second.address, (ethers.utils.parseUnits("1", 20)));
  });

  it("Should not allow non-owner to run the burn function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    await expect (ikhlasToken.connect(second).burn(second.address, (ethers.utils.parseUnits("1", 20)))).to.be.revertedWith('This transaction can only be carried out by owner!');
  });

  it("Should allow owner to run the burn function", async function () {
    const [signers, second, third] = await ethers.getSigners();
    const ikhlasToken = await new IkhlasToken__factory(signers).deploy();
    await ikhlasToken.connect(signers).transfer(second.address, (ethers.utils.parseUnits("1", 20)));
    expect (await ikhlasToken.connect(signers).burn(second.address, (ethers.utils.parseUnits("1", 20)))).to.emit(ikhlasToken, "Transfer").withArgs(second.address, '0x0000000000000000000000000000000000000000', (ethers.utils.parseUnits("1", 20)));
  });

});
