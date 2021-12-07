import React, {useEffect, useState} from "react"
import Campaign from "../../ethereum/Campaign";
import {Button, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import web3 from "../../ethereum/web3";
import {Box} from "@mui/system";
import {useNavigate, useParams} from "react-router-dom";
import {Paid} from "@mui/icons-material";
import {APP_CAMPAIGN_INTERACT} from "../../config/AppConstants";

function Show() {
    const navigate = useNavigate()
    const params = useParams();

    const [campaignSummary, setCampaignSummary] = useState({} as any)
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
            })
        })

        getAllRequests(campaign).then(requests => setCampaignRequests(requests))
    }, [params])

    function renderRequestSummary() {
        if (!campaignSummary) {
            return null
        }

        const items = [
            {
                header: campaignSummary.address,
                meta: "Contract address of this Campaign",
                description: "The address of the contract on the Ethereum network."
            },
            {
                header: campaignSummary.manager,
                meta: "Address of the manager",
                description: "The manager that created this campaign. Can create Requests and finalize them if enough funders approved."
            },
            {
                header: campaignSummary.minimumContribution,
                meta: "Minimum contribution (wei)",
                description: "Minimum contribution to become a funder for this campaign"
            },
            {
                header: campaignSummary.requestsCount,
                meta: "Number of requests",
                description: "A request is created by the manager to withdraw money from the contract. Has to be approved by more than 50% of the funders to be able to be paid out."
            },
            {
                header: campaignSummary.contributorsCount,
                meta: "Number of contributors",
                description: "Number of addresses that are funders of this campaign. To become a funder you have to contribute at least the minimum contribution amount to the contract."
            },
            {
                header: web3.utils.fromWei(campaignSummary.balance ? campaignSummary.balance.toString() : "0", "ether"),
                meta: "Current balance (ether) of the Contract",
                description: "Balance of how much ether is locked inside the contract right now."
            }
        ]

        return items.map(item => {
            return (
                <Grid item xs={6} key={item.header}>
                    <Card key={item.header} style={{height: "100%"}}>
                        <CardHeader
                            title={
                                <Typography noWrap fontWeight={"bold"}>
                                    {item.header}
                                </Typography>
                            }
                            subheader={
                                <Typography>
                                    {item.meta}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography>
                                {item.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    function renderRequests() {
        const items = campaignRequests.map((campaignRequest, index) => {
            return {
                requestIndex: index,
                description: campaignRequest.description,
                payoutValue: web3.utils.fromWei(campaignRequest.payoutValue, "ether"),
                recipient: campaignRequest.recipient,
                approvalCount: campaignRequest.approvalCount,
                complete: campaignRequest.complete
            }
        })

        return items.map(item => {
            return (
                <Grid item xs={6} key={item.description}>
                    <Card key={item.requestIndex + ": " + item.description}>
                        <CardHeader
                            title={
                                <Typography noWrap>
                                    {item.requestIndex + ": " + item.description}
                                </Typography>
                            }
                            subheader={item.payoutValue + " ether"}
                        />
                        <CardContent>
                            <Typography>
                                Recipient: {item.recipient}
                            </Typography>
                            <Typography>
                                approvalCount: {item.approvalCount}
                            </Typography>
                            <Typography>
                                complete: {item.complete.toString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h3"}>Campaign Information</Typography>
                </Grid>
                {renderRequestSummary()}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h3"}>Request Information</Typography>
                </Grid>
                {renderRequests()}
            </Grid>

            <Box textAlign={"center"}>
                <Button variant="contained" startIcon={<Paid/>}
                        onClick={() => navigate(APP_CAMPAIGN_INTERACT(campaignSummary.address))}>
                    Interact with Campaign
                </Button>
            </Box>
        </Box>
    )
}

export default Show