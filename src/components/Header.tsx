import React, {Dispatch} from 'react'
import {
    AppBar,
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import {Brightness3, WbSunny} from "@mui/icons-material";
import {IS_DARK_MODE} from "../config/AppConstants";
import {useNavigate} from "react-router-dom";

interface Props {
    isDarkMode: string,
    setIsDarkMode: Dispatch<string>
}

function Header(props: Props) {
    const navigate = useNavigate()
    const theme = useTheme()

    function changeDarkMode(event: any, isDarkMode: string) {
        if (isDarkMode) {
            props.setIsDarkMode(isDarkMode);
            localStorage.setItem(IS_DARK_MODE, isDarkMode);
        }
    }

    return (
        <AppBar position={"sticky"} style={{opacity: "0.9"}}>
            <Toolbar>
                <Button onClick={() => navigate("/")}>
                    <Typography variant={"h1"} component="h1" style={{fontSize: "2rem"}}
                                color={(theme.palette.mode === 'light') ? "black" : "white"}>
                        CrowdCoin
                    </Typography>
                </Button>
                <Box style={{flex: 1, display: "flex", flexDirection: "row-reverse"}}>
                    <Tooltip title={"Switch Darkmode"}>
                        <ToggleButtonGroup
                            value={props.isDarkMode}
                            exclusive
                            size="medium"
                            onChange={changeDarkMode}
                            aria-label="text alignment"
                        >
                            <ToggleButton value='true' aria-label="centered">
                                <Brightness3/>
                            </ToggleButton>
                            <ToggleButton value='false' aria-label="centered">
                                <WbSunny/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header