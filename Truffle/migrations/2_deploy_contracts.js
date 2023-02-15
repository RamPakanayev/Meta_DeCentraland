var Procurement = artifacts.require("Procurement");

module.exports = function(deployer) {
  deployer.deploy(Procurement);
};