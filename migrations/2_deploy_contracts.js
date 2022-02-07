var Greeting = artifacts.require("./Greeting.sol");
var Todo = artifacts.require("./Todo.sol");

module.exports = function(deployer) {
  deployer.deploy(Greeting,"Dilshani");
  deployer.deploy(Todo);
};
