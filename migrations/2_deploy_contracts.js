var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var SimpleWallet = artifacts.require("./SimpleWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleWallet);
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

};
