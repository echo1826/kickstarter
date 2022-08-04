// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// linter warnings (red underline) about pragma version can igonored!

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
    }

    address public manager;
    address[] approvers;
    uint256 public minimumContribution;
    Request[] public requests;

    constructor(uint256 minContribution) {
        manager = msg.sender;
        minimumContribution = minContribution;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers.push(msg.sender);
    }

    function getApprovers() public view returns (address[] memory) {
        return approvers;
    }

    function createRequest() restricted public {

    }
}
