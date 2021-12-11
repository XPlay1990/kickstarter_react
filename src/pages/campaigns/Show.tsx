import React, {useEffect, useState} from "react"
import Campaign from "../../ethereum/Campaign";
import {
    Button,
    CardContent,
    CardHeader,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import web3 from "../../ethereum/web3";
import {Box} from "@mui/system";
import {useNavigate, useParams} from "react-router-dom";
import {
    APP_CAMPAIGN_CONTRIBUTE,
    APP_CAMPAIGN_REQUEST_APPROVE,
    APP_CAMPAIGN_REQUEST_CREATE, APP_CAMPAIGN_REQUEST_FINALIZE
} from "../../config/AppConstants";

function Show() {
    const navigate = useNavigate()
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
            })
        })

        getAllRequests(campaign).then(requests => setCampaignRequests(requests))

        getCurrentUserAddress().then(userAddresses => {
            setCurrentUserAddress(userAddresses[0])
        })
    }, [params])

    function renderCampaignSummary() {
        if (!campaignSummary) {
            return null
        }

        const items = [
            {
                header: <Link target={"_blank"}
                              href={`https://rinkeby.etherscan.io/address/${campaignSummary.address}`}>{campaignSummary.address}</Link>,
                meta: "Contract address of this Campaign",
                link: "The address of the contract on the Ethereum network."
            },
            {
                header: <Link target={"_blank"}
                              href={`https://rinkeby.etherscan.io/address/${campaignSummary.manager}`}>{campaignSummary.manager}</Link>,
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
                    <Card key={item.header} style={{height: "100%"}} elevation={3}>
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
        <Box display={"flex"} flexDirection={"column"} gap={"10px"} alignItems={"center"}>
            <Typography variant={"h3"}>{campaignSummary.name}</Typography>
            <Grid container spacing={2}>
                {renderCampaignSummary()}
            </Grid>

            <Typography variant={"h3"}>Request Information</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Request Index </TableCell>
                            <TableCell> Description </TableCell>
                            <TableCell> Payout Value </TableCell>
                            <TableCell> Recipient </TableCell>
                            <TableCell> Approvals / Contributors</TableCell>
                            <TableCell>Vote</TableCell>
                            <TableCell>Complete</TableCell>
                            {
                                currentUserAddress === campaignSummary.manager ?
                                    <TableCell>Finish Request</TableCell> : null
                            }
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
                                    <Link target={"_blank"}
                                          href={`https://rinkeby.etherscan.io/address/${row.recipient}`}>{row.recipient}</Link>
                                </TableCell>
                                <TableCell>
                                    {`${row.approvalCount} / ${campaignSummary.contributorsCount}`}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => navigate(APP_CAMPAIGN_REQUEST_APPROVE(campaignSummary.address, row.requestIndex))}
                                    >
                                        Approve
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    {row.complete.toString()}
                                </TableCell>
                                {
                                    currentUserAddress === campaignSummary.manager ?
                                        <TableCell>
                                            <Tooltip
                                                title={((row.approvalCount / campaignSummary.contributorsCount) <= 0.5 || row.complete) ? "Already finalized" : "Finalize Request and release payment"}>
                                                <div>
                                                    <Button
                                                        variant={"contained"}
                                                        onClick={() => navigate(APP_CAMPAIGN_REQUEST_FINALIZE(campaignSummary.address, row.requestIndex))}
                                                        disabled={(row.approvalCount / campaignSummary.contributorsCount) <= 0.5 || row.complete}
                                                    >
                                                        Finalize
                                                    </Button>
                                                </div>
                                            </Tooltip>
                                        </TableCell> : null
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display={"flex"} gap={"10px"} alignContent={"center"}>
                <Button variant="contained" onClick={() => navigate(APP_CAMPAIGN_CONTRIBUTE(campaignSummary.address))}
                        style={{maxWidth: "300px"}}>
                    Contribute
                </Button>
                {
                    currentUserAddress === campaignSummary.manager ?
                        <Button variant="contained"
                                onClick={() => navigate(APP_CAMPAIGN_REQUEST_CREATE(campaignSummary.address))}
                                style={{maxWidth: "300px"}}>
                            Create Request
                        </Button> : null
                }
            </Box>
        </Box>
    )
}

export default Show