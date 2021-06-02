const FakeBscToken = artifacts.require("FakeBscToken");

module.exports = function (deployer) {
  deployer.deploy(FakeBscToken);
};
