// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract dBank {
    Token private token;

    mapping(address => uint256) public etherBalanceOf;
    mapping(address => uint256) public depositStart;
    mapping(address => bool) public isDeposited;

    event Deposit(address indexed user, uint256 etherAmount, uint256 timeStart);
    event Withdraw(address indexed user, uint etherAmount, uint depositTime, uint interest);
    

    constructor(Token _token) public {
        token = _token;
    }

    function deposit() public payable {
        require(
            isDeposited[msg.sender] == false,
            "Error, deposit already active"
        );
        require(msg.value >= 1e16, "Error, deposit must be >= 0.01 ETH");

        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        isDeposited[msg.sender] = true;
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        require(isDeposited[msg.sender] == true, "Error, no previous deposit");
        uint256 userBalance = etherBalanceOf[msg.sender];
        uint256 depositTime = block.timestamp - depositStart[msg.sender];

        uint256 interestPerSecond = 31668017 *
            (etherBalanceOf[msg.sender] / 1e16);
        uint256 interest = interestPerSecond * depositTime;

        msg.sender.transfer(etherBalanceOf[msg.sender]);
        token.mint(msg.sender, interest);
        depositStart[msg.sender] = 0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit Withdraw(msg.sender, userBalance, depositTime, interest);
    }


}
