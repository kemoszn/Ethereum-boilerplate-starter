pragma solidity  ^0.4.19;

    // contract should allow owner to deposit money
    // contract should allow owner to check balance
    // contract should allow owner to withdraw to checking's account
    // contract should have a maximum limit

contract Savings {

    address public owner;
    uint public amount;

    function Savings() public {
        owner = msg.sender;
    }

    function setAmount(uint newAmount) public {
        amount = newAmount;
    }

    function Withdraw() public mustBeOwner {
        owner.transfer(amount);
    }

    function Deposit() public payable mustBeOwner {
        require(address(this).balance < 20.00 ether);
    }

    function checkBalance() public mustBeOwner view returns (uint) {
    return address(this).balance;
  }

    modifier mustBeOwner() {
    require(msg.sender == owner);
    _;
  }

}
