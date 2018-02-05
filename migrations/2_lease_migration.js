var Lease = artifacts.require("./Lease.sol")

module.exports = function(deployer) {
  deployer.deploy(Lease);
}
