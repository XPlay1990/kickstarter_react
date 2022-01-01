import React, {useState} from "react"
import {Alert, AlertTitle, Collapse, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import ethereumLogo from "../../../resources/coin-logos/eth-logo.png";
import CloseIcon from '@mui/icons-material/Close';
import {APP_PATH_CAMPAIGN_SHOW} from "../../../config/AppConstants";

function CreateRequest() {
    const params = useParams();
    const navigate = useNavigate()
    const {campaignSummary} = useOutletContext() as any

    const campaignAddress = params.address as string

    const [requestDescription, setRequestDescription] = useState("")
    const [payoutValue, setPayoutValue] = useState("0")
    const [recipient, setRecipient] = useState(campaignSummary.manager)

    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [errorMessage, setErrorMessage] = React.useState("");

    function handleClose() {
        setIsErrorMessageOpen(false)
    }

    async function onSubmitRequest(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await Campaign(campaignAddress).methods.createManagerRequest(requestDescription, web3.utils.toWei(payoutValue, "ether"), recipient).send({
                from: accounts[0]
            })
            navigate(APP_PATH_CAMPAIGN_SHOW(campaignAddress))
        } catch (err) {
            console.log(err)
            setErrorMessage("An Error occurred during transaction: " + JSON.stringify(err))
            setIsErrorMessageOpen(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmitRequest}
              style={{
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "50%"
              }}>
            <Typography variant={"h4"}>Create new Request</Typography>
            <TextField inputMode={"text"} label={"Request Descr."} required
                       fullWidth={true}
                       value={requestDescription}
                       onChange={event => setRequestDescription(event.target.value)}
            />
            <TextField inputMode={"decimal"} label={"Payout Value"} required
                       InputProps={{
                           endAdornment: (
                               <InputAdornment position="end">
                                   <Typography>ether</Typography>
                               </InputAdornment>
                           ),
                       }}
                       fullWidth={true}
                       value={payoutValue}
                       onChange={event => setPayoutValue(event.target.value)}
            />
            <TextField inputMode={"text"} label={"Recipient"} required
                       fullWidth={true}
                       value={recipient}
                       onChange={event => setRecipient(event.target.value)}
            />
            <LoadingButton loading={isLoading} type={"submit"} variant={"contained"}
                           startIcon={<img src={ethereumLogo} width={40} alt={""}/>}
                           style={{maxWidth: "300px"}}>
                Create new Request
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

export default CreateRequest
