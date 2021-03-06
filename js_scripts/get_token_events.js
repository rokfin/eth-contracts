
async function checkForBurnEvents() {
  var RaeToken = artifacts.require("../contracts/RaeToken.sol");
  var RaeMintContract = artifacts.require("../contracts/RaeMintContract.sol");
  let accounts = await web3.eth.getAccounts();
  let rokfin = accounts[3];
  let nytimes = accounts[4];
  let fedserver = accounts[0];
  let zero_address = '0x0000000000000000000000000000000000000000';

  let token = await RaeToken.deployed();
  let minter = await RaeMintContract.deployed();

  // filter for burn events from rokfin
  token.getPastEvents('Transfer', {
    filter: { from: rokfin, to: zero_address }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
  }, (error, events) => { console.log(events); })
    .then((events) => {
      events.forEach(function (event) {
        console.log(
          "\n---------Burn Event ---------\n" +
          "txhash: " + event.transactionHash + "\n" +
          "blockNumber: " + event.blockNumber + "\n" +
          "from: " + event.returnValues.from + "\n" +
          "to: " + event.returnValues.to + "\n" +
          "value: " + event.returnValues.value + "\n"
        )


      });
    });




}

module.exports = function (callback) {
  checkForBurnEvents();
  // might have to call callback here
}


