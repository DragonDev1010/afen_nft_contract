const Afen = artifacts.require("Afen_nft.sol")
const Token_Afen = artifacts.require("FakeAfenToken.sol")
const Token_Bsc = artifacts.require("FakeBscToken.sol")

module.exports = function (deployer) {
  deployer.deploy(Afen);
  deployer.deploy(Token_Afen)
  deployer.deploy(Token_Bsc)
};
