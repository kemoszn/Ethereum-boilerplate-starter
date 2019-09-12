const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'Mnuemonic',
  'https://rinkeby.infura.io/v3/9a322214da3d440998699686ac49cc1d'
);

const web3 = new Web3(provider);

const deploy = async () => {
  //get all acounts
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from", accounts[0])
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data:'0x' + bytecode, arguements: []})
    .send({ from: accounts[0], gas: '2000000'});

  console.log("Contract deployed to ", result.options.address);
}

deploy();
