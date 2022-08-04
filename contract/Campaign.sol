// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
// linter warnings (red underline) about pragma version can igonored!

contract Campaign {
    address public manager;
    address payable[] contributors;
    uint public minimumContribution;
    
}