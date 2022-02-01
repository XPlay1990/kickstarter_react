// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./KickstarterCampaign.sol";

contract KickstarterCampaignFactory {
    address[] public deployedCampaigns;

    constructor(){
    }

    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }

    function createCampaign(string memory name, uint minimumContribution, uint fundingGoal) public {
        address campaignAddress = address(new KickstarterCampaign(name, minimumContribution, fundingGoal, msg.sender));
        deployedCampaigns.push(campaignAddress);
    }
}
