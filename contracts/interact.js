/* Imports */
const Web3 = require('web3');
var web3 = new Web3();
const fs = require('fs');
web3.setProvider(new Web3.providers.IpcProvider("/home/altairmn/.ethereum/testnet/geth.ipc", net));

/* constants */
const _pm_addr = "0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b"
const _gasPrice = '35000000000'
const _gas = 1500000


/* Unlock account */
web3.eth.personal.unlockAccount("0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b", "superfly", 1000).then(console.log)

/* TokenContract */

let _tokenContract 
fs.readFile('./build/contracts/Token.json', 'utf8', function(err, content) {
  _tokenContract = JSON.parse(content)
});

var tokenContract = new web3.eth.Contract(_tokenContract.abi)

// Init
var _supply = 10000;

// Deploy contract
var tokenPromise = tokenContract.deploy({
    data: _tokenContract.bytecode,
    arguments: [_supply]
}).send({
    from: '0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b',
    gas: 1500000,
    gasPrice: '35000000000'
}, function(error, transactionHash){ 
  console.log("Transaction with TxHash: " + transactionHash + " waiting to be mined.")}).on('error', 
    function(error) {
      console.log(error)
}).on('transactionHash',
  function(transactionHash) {
    console.log("Transaction hash is: " + transactionHash)
}).on('receipt', 
  function(receipt) {
   console.log("Contract mined! Available at address: " + receipt.contractAddress) // contains the new contract address
}).on('confirmation',
  function(confirmationNumber, receipt) { 
    console.log("Confirmation Number : " + confirmationNumber + " with receipt: " + receipt)
}).then(function(newContractInstance) {
    console.log(newContractInstance.options.address) // instance with the new contract address
});

var tC = new web3.eth.Contract(_tokenContract.abi, "0x6b1ff58eA3C2c4c73599fF0feEA9e150254Eef56")


// Transaction
tC.methods.sendCoin("0x10621Daf80FE2588aEc1dBee4e5950FE8516DE33", 1000).send({
  from: "0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b",
    gas: 1500000,
    gasPrice: '35000000000'
}).on("transactionHash", function(transactionHash) {
  console.log("Transaction sent with TxHash: " + transactionHash)
}).on("error",
  console.error
).on("receipt", function(receipt){
  console.log(receipt);
})

/* Crowdsale Contract */

let _crowdsaleContract 
fs.readFile('./build/contracts/Crowdsale.json', 'utf8', function(err, content) {
  _crowdsaleContract = JSON.parse(content)
});

var _beneficiary = "0x10621Daf80FE2588aEc1dBee4e5950FE8516DE33";
var _fundingGoal = web3.toWei("100", "ether");
var _duration = 30;
var _price = web3.toWei("0.02", "ether");
var _reward = "0x6b1ff58eA3C2c4c73599fF0feEA9e150254Eef56";          // the token contract address


var crowdsaleContract = new web3.eth.Contract(_crowdsaleContract.abi);
var crowdsalePromise = crowdsaleContract.deploy({
    data: _crowdsaleContract.bytecode,
    arguments: [_beneficiary, _fundingGoal, _duration, _price, _reward]
}).send({
    from: '0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b',
    gas: 1500000,
    gasPrice: '35000000000'
}, function(error, transactionHash){ 
  console.log("Transaction with TxHash: " + transactionHash + " waiting to be mined.")}).on('error', 
    function(error) {
      console.log(error)
}).on('transactionHash',
  function(transactionHash) {
    console.log("Transaction hash is: " + transactionHash)
}).on('receipt', 
  function(receipt) {
   console.log("Contract mined! Available at address: " + receipt.contractAddress) // contains the new contract address
}).on('confirmation',
  function(confirmationNumber, receipt) { 
    console.log("Confirmation Number : " + confirmationNumber + " with receipt: " + receipt)
}).then(function(newContractInstance) {
    console.log(newContractInstance.options.address) // instance with the new contract address
});



/* Lease Contract */
let _leaseContract 
fs.readFile('./build/contracts/Lease.json', 'utf8', function(err, content) {
  _leaseContract = JSON.parse(content)
});

var _rentalInterval = 30
var _rentalAmount = web3.utils.toWei("0.02", "ether")

var leaseContract = new web3.eth.Contract(_leaseContract.abi)
var lease = leaseContract.deploy({
    data: _leaseContract.bytecode,
    arguments: [_rentalInterval, _rentalAmount]
}).send({
    from: '0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b',
    gas: 1500000,
    gasPrice: '35000000000'
}, function(error, transactionHash){ 
  console.log("Transaction with TxHash: " + transactionHash + " waiting to be mined.")}).on('error', 
    function(error) {
      console.log(error)
}).on('transactionHash',
  function(transactionHash) {
    console.log("Transaction hash is: " + transactionHash)
}).on('receipt', 
  function(receipt) {
   console.log("Contract mined! Available at address: " + receipt.contractAddress) // contains the new contract address
}).on('confirmation',
  function(confirmationNumber, receipt) { 
    console.log("Confirmation Number : " + confirmationNumber + " with receipt: " + receipt)
}).then(function(newContractInstance) {
    leaseContract.options.address = newContractInstance.options.address;
    console.log(newContractInstance.options.address) // instance with the new contract address
});

/* Add leaseApplicants */
leaseContract.methods.addApplicant("0x61c31C3B32D2661a0AA853484BD01ba5357CC091").send({
  from: "0x4d28F4e8982d89B86675724CEd3aD420c3f9b05b",
  gas: _gas,
  gasPrice: _gasPrice
}).on("transactionHash", function(transactionHash) {
  console.log("Transaction sent with TxHash: " + transactionHash)
}).on("error",
  console.error
).on("receipt", function(receipt){
  console.log(receipt);
})
