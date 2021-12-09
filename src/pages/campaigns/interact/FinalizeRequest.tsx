import React, {useEffect, useState} from "react"
import {InputAdornment, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate, useParams} from "react-router-dom";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import ethereumLogo from "../../../resources/coin-logos/eth-logo.png";

function FinalizeRequest() {
    const params = useParams();
    const navigate = useNavigate()

    const campaignAddress = params.address
    const [contributionValue, setContributionValue] = useState("0.0000")


    const [isLoading, setIsLoading] = useState(false)
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false)
    const [errorState, setErrorState] = React.useState({
        vertical: 'top' as any,
        horizontal: 'right' as any,
        errorMessage: ""
    });
    useEffect(() => {

    }, [params])

    async function onSubmit(event: any) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            await Campaign(campaignAddress).methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(contributionValue, "ether")
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
                Finalize Request
            </LoadingButton>
        </form>
    )
}

export default FinalizeRequest