// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// linter warnings (red underline) about pragma version can igonored!

contract Campaign {
    address public manager;
    address[] approvers;
    uint public minimumContribution;
    
    constructor(uint minContribution) {
        manager = msg.sender;
        minimumContribution = minContribution;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers.push(msg.sender);
    }
}