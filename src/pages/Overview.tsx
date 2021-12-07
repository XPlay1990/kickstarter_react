import React, {useEffect, useState} from "react"
import campaignFactory from "../ethereum/CampaignFactory";
import HDWalletProvider from "@truffle/hdwallet-provider"
import {infuraLink, secretPhrase} from "../secretConfig";
import Card from '@mui/material/Card';
import {Box, Button, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

const provider = new HDWalletProvider(
    secretPhrase,
    infuraLink
)

function Overview() {
    const [campaigns, setCampaigns] = useState([] as any[])

    useEffect(() => {
        async function getCampaigns() {
            return await campaignFactory.methods.getDeployedCampaigns().call()
        }

        getCampaigns().then(result => {
            setCampaigns(result)
        })

    }, [])

    function renderCampaigns() {
        const items = campaigns.map(address => {
            return {
                header: address,
                description:
                    <Link href={`/campaigns/${address}`}>
                        View Campaign
                    </Link>,
                fluid: true
            }
        })

        return items.map(item => {
            return (
                <Grid item xs={6}>
                    <Card key={item.header}>
                        <CardHeader
                            title={
                                <Typography noWrap>
                                    {item.header}
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

    return (
        <Box>
            <Typography variant={"h3"} fontSize={"large"}>Open Campaigns</Typography>
            <Grid container spacing={2}>
                {renderCampaigns()}
            </Grid>
            <Box display={"flex"} flexDirection={"row-reverse"}>
                <Link href={"/campaigns/New"}>
                    <Button variant="contained" startIcon={<AddCircle/>}>
                        Create new Campaign
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Overview