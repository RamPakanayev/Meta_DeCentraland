var FlatNFT = artifacts.require("FlatNFT");
var Marketplace = artifacts.require("Marketplace");

module.exports = async function(deployer) {
  await deployer.deploy(Marketplace);
  const marketplace = await Marketplace.deployed();
  await deployer.deploy(FlatNFT, marketplace.address);
}

//Because FlatNFT requires the Marketplace contract address, order matters here!
// Truffle allows us to deploy contracts in order using Promise or await/async.