import React, {useEffect, useState} from "react"
import {Grid, InputAdornment, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useParams} from "react-router-dom";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import ethereumLogo from "../../../resources/coin-logos/eth-logo.png";

function CreateRequest() {
    const params = useParams();
    const navigate = useNavigate()

    const campaignAddress = params.address

    const [requestDescription, setRequestDescription] = useState("")
    const [payoutValue, setPayoutValue] = useState("0")
    const [recipient, setRecipient] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [errorState, setErrorState] = React.useState({
        vertical: 'top' as any,
        horizontal: 'right' as any,
        errorMessage: ""
    });
    useEffect(() => {

    }, [params])

    async function onSubmitRequest(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await Campaign(campaignAddress).methods.createManagerRequest(requestDescription, web3.utils.toWei(payoutValue, "ether"), recipient).send({
                from: accounts[0]
            })
            navigate(`/campaigns/${campaignAddress}`)
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
        </form>
    )
}

export default CreateRequest