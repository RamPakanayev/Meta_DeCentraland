var FlatNFT = artifacts.require("FlatNFT");
var Marketplace = artifacts.require("Marketplace");
var PixelZ = artifacts.require("PixelZ");

module.exports = async function(deployer) {
  await deployer.deploy(Marketplace);
  const marketplace = await Marketplace.deployed();
  await deployer.deploy(FlatNFT, marketplace.address);
  await deployer.deploy(PixelZ, marketplace.address);
}