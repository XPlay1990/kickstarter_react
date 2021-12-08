import React, {useEffect, useState} from "react"
import Campaign from "../../ethereum/Campaign";
import {
    Button,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import web3 from "../../ethereum/web3";
import {Box} from "@mui/system";
import {useNavigate, useParams} from "react-router-dom";
import {APP_CAMPAIGN_INTERACT} from "../../config/AppConstants";
import ethereumLogo from "../../resources/coin-logos/eth-logo.png"

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
                name: summary[5],
            })
        })

        getAllRequests(campaign).then(requests => setCampaignRequests(requests))
    }, [params])

    function renderCampaignSummary() {
        if (!campaignSummary) {
            return null
        }

        const items = [
            {
                header: campaignSummary.address,
                meta: "Contract address of this Campaign",
                link: "The address of the contract on the Ethereum network."
            },
            {
                header: campaignSummary.manager,
                meta: "Address of the manager",
                link: "The manager that created this campaign. Can create Requests and finalize them if enough funders approved."
            },
            {
                header: campaignSummary.minimumContribution,
                meta: "Minimum contribution (wei)",
                link: "Minimum contribution to become a funder for this campaign"
            },
            {
                header: campaignSummary.requestsCount,
                meta: "Number of requests",
                link: "A request is created by the manager to withdraw money from the contract. Has to be approved by more than 50% of the funders to be able to be paid out."
            },
            {
                header: campaignSummary.contributorsCount,
                meta: "Number of contributors",
                link: "Number of addresses that are funders of this campaign. To become a funder you have to contribute at least the minimum contribution amount to the contract."
            },
            {
                header: web3.utils.fromWei(campaignSummary.balance ? campaignSummary.balance.toString() : "0", "ether"),
                meta: "Current balance (ether) of the Contract",
                link: "Balance of how much ether is locked inside the contract right now."
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
                                {item.link}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )
        })
    }

    function mapRequests() {
        return campaignRequests.map((campaignRequest, index) => {
            return {
                requestIndex: index,
                description: campaignRequest.description,
                payoutValue: web3.utils.fromWei(campaignRequest.payoutValue, "ether"),
                recipient: campaignRequest.recipient,
                approvalCount: campaignRequest.approvalCount,
                complete: campaignRequest.complete
            }
        })
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box textAlign={"center"}>
                        <Typography variant={"h3"}>{campaignSummary.name}</Typography>
                    </Box>
                </Grid>
                {renderCampaignSummary()}

                <Grid item xs={12}>
                    <Typography variant={"h3"}>Request Information</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> Request Index </TableCell>
                                    <TableCell> Description </TableCell>
                                    <TableCell> Payout Value </TableCell>
                                    <TableCell> Recipient </TableCell>
                                    <TableCell> Approval count </TableCell>
                                    <TableCell>Complete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mapRequests().map((row: any) => (
                                    <TableRow
                                        key={row.requestIndex}
                                    >
                                        <TableCell>
                                            {row.requestIndex}
                                        </TableCell>
                                        <TableCell>
                                            {row.description}
                                        </TableCell>
                                        <TableCell>
                                            {row.payoutValue}
                                        </TableCell>
                                        <TableCell>
                                            {row.recipient}
                                        </TableCell>
                                        <TableCell>
                                            {`${row.approvalCount} / ${campaignSummary.contributorsCount}`}
                                        </TableCell>
                                        <TableCell>
                                            {row.complete || "false"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            <Box textAlign={"center"} margin={"10px"}>
                <Button variant="contained" startIcon={<img src={ethereumLogo} width={40} alt={""}/>}
                        onClick={() => navigate(APP_CAMPAIGN_INTERACT(campaignSummary.address))}>
                    Interact with Campaign
                </Button>
            </Box>
        </Box>
    )
}

export default Show