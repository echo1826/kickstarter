// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

// linter warnings (red underline) about pragma version can igonored!

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function getCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }

    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint256 public numRequests;
    mapping(address => bool) public approvers;
    uint256 public minimumContribution;
    uint256 public approversCount;
    mapping(uint256 => Request) public requests;

    constructor(uint256 minContribution, address managerAddress) {
        manager = managerAddress;
        minimumContribution = minContribution;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address recipient
    ) public restricted {
        Request storage request = requests[numRequests++];
        request.description = description;
        request.value = value;
        request.recipient = payable(recipient);
        request.complete = false;
        request.approvalCount = 0;
    }

    function approveRequest(uint256 key) public {
        Request storage request = requests[key];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 key) public restricted {
        Request storage request = requests[key];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
