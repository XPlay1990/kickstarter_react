import React, {useEffect, useState} from "react"
import campaignFactory from "../ethereum/CampaignFactory";
import campaign from "../ethereum/Campaign";
import Card from '@mui/material/Card';
import {Box, Button, CardContent, CardHeader, Grid, Link, Typography} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

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
                subHeader: campaignObject.address,
                link:
                    <Link href="#" onClick={() => navigate(`/campaigns/${campaignObject.address}`)}>
                        View Campaign
                    </Link>
            })
        })

        return items.map(item => {
            return (
                <Grid item xs={6}>
                    <Card key={item.header}>
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
        <Box>
            <Typography variant={"h3"} fontSize={"large"}>Open Campaigns</Typography>
            <Grid container spacing={2}>
                {renderCampaigns()}
            </Grid>
            <Box display={"flex"} flexDirection={"row-reverse"}>
                <Link href="#" onClick={() => navigate("/campaigns/New")}>
                    <Button variant="contained" startIcon={<AddCircle/>}>
                        Create new Campaign
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Overview