const Peg = artifacts.require("./Peg.sol")

module.exports = function (deployer, network, accounts) {
  const relayer = '0xE7b757Fec7189768F0ff1dAFa0eA75a94bd0Dc22'

  deployer.deploy(Peg, relayer)
}
