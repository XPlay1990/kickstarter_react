import React, {useEffect, useState} from "react"
import {Alert, AlertTitle, Collapse, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useParams} from "react-router-dom";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import ethereumLogo from "../../../resources/coin-logos/eth-logo.png";
import CloseIcon from '@mui/icons-material/Close';
import {APP_CAMPAIGN_SHOW} from "../../../config/AppConstants";

function Contribute() {
    const params = useParams();
    const navigate = useNavigate()

    const campaignAddress = params.address as string
    const [contributionValue, setContributionValue] = useState("0.0000")


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
            await Campaign(campaignAddress).methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(contributionValue, "ether")
            })
            navigate(APP_CAMPAIGN_SHOW(campaignAddress))
        } catch (err) {
            console.log(err)
            setErrorMessage("An Error occurred during transaction: " + JSON.stringify(err))
            setIsErrorMessageOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit}
              style={{display: "flex", flexDirection: "column", gap: "10px", margin: "auto", width: "50%"}}>
            <Typography variant={"h4"}>Contribute to Campaign</Typography>

            <TextField inputMode={"decimal"} label={"Contribution value"} required
                       InputProps={{
                           endAdornment: (
                               <InputAdornment position="end">
                                   <Typography>ether</Typography>
                               </InputAdornment>
                           ),
                       }}
                       value={contributionValue}
                       onChange={event => setContributionValue(event.target.value)}
            />
            <LoadingButton loading={isLoading} type={"submit"} variant={"contained"}
                           startIcon={<img src={ethereumLogo} width={40} alt={""}/>}
                           style={{maxWidth: "300px"}}>
                Contribute
            </LoadingButton>

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
        </form>
    )
}

export default Contribute