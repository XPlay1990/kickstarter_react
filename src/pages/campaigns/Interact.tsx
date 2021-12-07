import React, {useEffect, useState} from "react"
import Campaign from "../../ethereum/Campaign";
import campaign from "../../ethereum/Campaign";
import {Button, CardContent, CardHeader, Divider, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import web3 from "../../ethereum/web3";
import {Box} from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import {useParams} from "react-router-dom";
import {AddCircle, AttachMoney, Paid} from "@mui/icons-material";

function Show() {
    const params = useParams();

    const [campaignSummary, setCampaignSummary] = useState({} as any)
    const [currentUserAddress, setCurrentUserAddress] = useState("")

    const [fundingValue, setFundingValue] = useState("0")
    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [errorState, setErrorState] = React.useState({
        vertical: 'top' as any,
        horizontal: 'right' as any,
        errorMessage: ""
    });
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
            })
        })

        getCurrentUserAddress().then(userAddresses => setCurrentUserAddress(userAddresses[0]))
    }, [params])

    async function onSubmit(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await campaign(campaignSummary.address).methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(fundingValue, "ether")
            })
            window.location.reload();
        } catch (err) {
            console.log(err)
            errorState.errorMessage = "An Error occurred during transaction: " + JSON.stringify(err)
            setErrorState(errorState)
            setIsErrorMessageOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6} display={"flex"} flexDirection={"column"}>
                    <form onSubmit={onSubmit}
                          style={{display: "flex", flexDirection: "column", width: "50%", margin: "auto"}}>
                        <Typography variant={"h4"}>Contribute to Campaign</Typography>

                        <TextField inputMode={"decimal"} label={"Funding value"} required
                                   InputProps={{
                                       endAdornment: (
                                           <InputAdornment position="end">
                                               <Typography>ether</Typography>
                                           </InputAdornment>
                                       ),
                                   }}
                                   value={fundingValue}
                                   onChange={event => setFundingValue(event.target.value)}
                        />
                        <LoadingButton loading={isLoading} type={"submit"} variant={"contained"}
                                       style={{maxWidth: "300px", margin: "5px"}}>
                            Contribute
                        </LoadingButton>
                    </form>
                </Grid>

                {
                    currentUserAddress === campaignSummary.manager ?
                        <Grid item xs={6} display={"flex"} flexDirection={"column"}>
                            <form onSubmit={onSubmit}
                                  style={{display: "flex", flexDirection: "column", width: "50%", margin: "auto"}}>
                                <Typography variant={"h4"}>Contribute to Campaign</Typography>

                                <TextField inputMode={"decimal"} label={"Funding value"} required
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment position="end">
                                                       <Typography>ether</Typography>
                                                   </InputAdornment>
                                               ),
                                           }}
                                           value={fundingValue}
                                           onChange={event => setFundingValue(event.target.value)}
                                />
                                <LoadingButton loading={isLoading} type={"submit"} variant={"contained"}
                                               style={{maxWidth: "300px", margin: "5px"}}>
                                    Create new Request
                                </LoadingButton>
                            </form>
                        </Grid>
                        : null
                }
            </Grid>
        </Box>
    )
}

export default Show