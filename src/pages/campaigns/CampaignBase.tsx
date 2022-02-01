import React, {useEffect, useState} from "react"
import Campaign from "../../ethereum/Campaign";
import web3 from "../../ethereum/web3";
import {Outlet, useParams} from "react-router-dom";

function CampaignBase() {
    const params = useParams();

    const [campaignSummary, setCampaignSummary] = useState({} as any)
    const [currentUserAddress, setCurrentUserAddress] = useState("")
    const [campaignRequests, setCampaignRequests] = useState([] as any[])

    useEffect(() => {
        async function getCampaignSummary(campaign: any) {
            return await campaign.methods.getSummary().call()
        }

        async function getAllRequests(campaign: any) {
            const requestCount = await campaign.methods.getRequestsCount().call();

            return await Promise.all(
                Array(parseInt(requestCount))
                    .fill(0)
                    .map((element, index) => {
                        return campaign.methods.campaignRequests(index.toString()).call();
                    })
            );
        }

        async function getCurrentUserAddress() {
            return await web3.eth.getAccounts()
        }

        const address = params.address;
        const campaign = Campaign(address)

        getCampaignSummary(campaign).then(summary => {
            setCampaignSummary({
                address: campaign.options.address,
                minimumContribution: summary[0],
                balance: summary[1],
                requestsCount: summary[2],
                contributorsCount: summary[3],
                manager: summary[4],
                name: summary[5],
                fundingGoal: summary[6]
            })
        })

        getAllRequests(campaign).then(requests => setCampaignRequests(requests))

        getCurrentUserAddress().then(userAddresses => {
            setCurrentUserAddress(userAddresses[0])
        })
    }, [params])


    return (
        <Outlet context={{
            campaignSummary: campaignSummary,
            campaignRequests: campaignRequests,
            currentUserAddress: currentUserAddress
        }}/>
    )
}

export default CampaignBase
