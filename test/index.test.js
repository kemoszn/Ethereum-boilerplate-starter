const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

beforeEach (async () => {
  //get a list of all the accounts
  accounts = await web3.eth.getAccounts()
  savings = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguements: []})
    .send({ from: accounts[0], gas: '1000000'});
  });
  //use one of these contracts to deploy the contract

describe('Savings', () => {
  it('deploys a contract', () => {
    assert.ok(savings.options.address);
    //console.log(savings.options.address);
  });

  it('sets an amount', async () => {
    await savings.methods.setAmount('100000000000')
      .send({ from: accounts[0] });
    const amount = await savings.methods.amount().call();
    //console.log(amount);
    assert.equal(amount, '100000000000');
  });

  it('allows owner to deposit money', async() => {
    await savings.methods.Deposit()
      .send({ from: accounts[0], value: web3.utils.toWei('0.5','ether') });
    const balance = await savings.methods.checkBalance().call();
    assert.equal(balance, 500000000000000000);
    //console.log(balance);
  });

  it('allows owner to withdraw a certain amount of money', async() =>{
    const initialBalance = await savings.methods.checkBalance().call();
    await savings.methods.setAmount('200000000000000000')
      .send({ from: accounts[0] });
    const amount = await savings.methods.amount().call();
    await savings.methods.Deposit()
      .send({ from: accounts[0], value: web3.utils.toWei('0.5','ether') });
    const midBalance = await savings.methods.checkBalance().call();
    await savings.methods.Withdraw()
      .send({ from: accounts[0]});
    const finalBalance = await savings.methods.checkBalance().call();
    const difference = await finalBalance - initialBalance;
    assert.equal(difference, finalBalance);

  });

  it('has a maximum limit', async() => {
    try{
      await savings.methods.Deposit()
        .send({ from: accounts[0], value: web3.utils.toWei('22','ether') });
      assert(false);
    } catch(err) {
        assert(err);
    }

  });

  it('only account owner is authorized', async() => {
    try {
      await savings.methods.Deposit()
        .send({ from: accounts[0], value: web3.utils.toWei('22','ether')});
      balance = await savings.methods.checkBalance().call();
      await console.log(balance);
      assert(false);
    } catch(error) {
      assert(error);
    }
  })

});
