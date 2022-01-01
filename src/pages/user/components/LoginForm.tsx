import React, {useState} from "react";
import {Button, FormControl, TextField} from "@mui/material";

function LoginForm() {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(event: any) {
        event.preventDefault();

        // const loginRequest = Object.assign({}, this.state);

        // login(loginRequest)
        //     .then(response => {
        //         localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        //         Alert.success("You're successfully logged in!");
        //         this.props.history.push("/");
        //     }).catch(error => {
        //     Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        // });
    }

    return (
        <FormControl onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <TextField inputMode="text" type="text" name="username"
                       className="form-control" label={"Username or E-Mail"}
                       value={userName} onChange={event => setUserName(event.target.value)} required/>
            <TextField inputMode="text" type="password" name="password"
                       className="form-control" label="Password"
                       value={password} onChange={event => setPassword(event.target.value)} required/>
            <Button type="submit" className="btn btn-block btn-primary">Login</Button>
        </FormControl>
    );
}

export default LoginForm
