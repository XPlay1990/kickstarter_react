import React, {useState} from "react"
import {Alert, AlertTitle, Box, Collapse, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import campaignFactory from "../../ethereum/CampaignFactory";
import web3 from "../../ethereum/web3";
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from 'react-router-dom';
import {APP_PATH_LandingPage} from "../../config/AppConstants";

function NewCampaign() {
    const navigate = useNavigate()
    const [minimumContribution, setMinimumContribution] = useState("0")
    const [campaignName, setCampaignName] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [errorMessage, setErrorMessage] = React.useState("");

    function handleClose() {
        setIsErrorMessageOpen(false)
    }

    async function onSubmit(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await campaignFactory.methods.createCampaign(campaignName, minimumContribution).send({
                from: accounts[0]
            })

            await navigate(APP_PATH_LandingPage)
        } catch (err) {
            setErrorMessage("An Error occurred during transaction: " + JSON.stringify(err))
            setIsErrorMessageOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box>
            <form onSubmit={onSubmit}
                  style={{display: "flex", flexDirection: "column", gap: "10px", width: "50%", margin: "auto"}}>
                <Typography variant={"h4"}>New Campaign</Typography>
                <TextField inputMode={"text"} label={"Campaign Name"} required
                           value={campaignName}
                           onChange={event => setCampaignName(event.target.value)}
                />
                <TextField inputMode={"decimal"} label={"Minimum Contribution"} required
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <Typography>wei</Typography>
                                   </InputAdornment>
                               ),
                           }}
                           value={minimumContribution}
                           onChange={event => setMinimumContribution(event.target.value)}
                />
                <LoadingButton loading={isLoading} type={"submit"} variant={"contained"}
                               style={{maxWidth: "300px"}}>
                    Create
                </LoadingButton>
            </form>

            <Collapse in={isErrorMessageOpen}>
                <Alert severity="error"
                       style={{wordBreak: "break-word"}}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="medium"
                               onClick={() => {
                                   handleClose()
                               }}
                           >
                               <CloseIcon fontSize="inherit"/>
                           </IconButton>
                       }
                >
                    <AlertTitle>Transaction failed!</AlertTitle>
                    <br/>
                    {errorMessage}
                </Alert>
            </Collapse>
        </Box>
    )
}

export default NewCampaign