import React, {useEffect, useState} from "react"
import campaignFactory from "../ethereum/CampaignFactory";
import campaign from "../ethereum/Campaign";
import Card from '@mui/material/Card';
import {Box, Button, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {APP_CAMPAIGN_SHOW} from "../config/AppConstants";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Overview() {
    const navigate = useNavigate()

    const [campaigns, setCampaigns] = useState([] as any[])

    useEffect(() => {
        async function getCampaigns() {
            return await campaignFactory.methods.getDeployedCampaigns().call()
        }

        async function getCampaignName(address: string) {
            return await campaign(address).methods.campaignName().call()
        }

        getCampaigns().then(result => {
            const promiseArray = [] as any[]
            const campaignsArray = [] as any[]
            result.forEach((campaignAddress: string) => {
                promiseArray.push(getCampaignName(campaignAddress))
            })

            Promise.all(promiseArray).then(campaignNames => {
                campaignNames.forEach((name: string, index: number) => {
                    campaignsArray.push({address: result[index], name: name})
                })

                setCampaigns(campaignsArray)
            })
        })
    }, [])

    function renderCampaigns() {
        const items = [] as any[]
        campaigns.forEach(campaignObject => {
            items.push({
                header: campaignObject.name,
                subHeader: <Link target={"_blank"}
                                 href={`https://rinkeby.etherscan.io/address/${campaignObject.address}`}>{campaignObject.address}</Link>,
                link:
                    <Button onClick={() => navigate(APP_CAMPAIGN_SHOW(campaignObject.address))}
                            endIcon={<ArrowForwardIosIcon/>}>
                        View Campaign
                    </Button>
            })
        })

        return items.map(item => {
            return (
                <Grid item xs={6}>
                    <Card key={item.header} elevation={3}>
                        <CardHeader
                            title={
                                item.header
                            }
                            subheader={
                                item.subHeader
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

    return (
        <Box display={"flex"} flexDirection={"column"} gap={"10px"} alignItems={"center"}>
            <Typography variant={"h3"} fontSize={"large"}>Open Campaigns</Typography>
            <Grid container spacing={2}>
                {renderCampaigns()}
            </Grid>
            <Box display={"flex"} flexDirection={"row-reverse"}>
                <Link href="#" onClick={() => navigate("/campaigns/New")}>
                    <Button variant={"contained"} startIcon={<AddCircle/>}>
                        Create new Campaign
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Overview
