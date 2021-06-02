const FakeAfenToken = artifacts.require("FakeAfenToken");

module.exports = function (deployer) {
  deployer.deploy(FakeAfenToken);
};
