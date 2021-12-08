import React, {useEffect} from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, Paper, responsiveFontSizes, Theme, useMediaQuery} from "@mui/material";
import {ThemeProvider} from "@mui/system";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Overview from "./pages/Overview";
import NotFound from "./pages/error/NotFound";
import {FORBIDDEN_URL, IS_DARK_MODE} from "./config/AppConstants";
import Forbidden from "./pages/error/Forbidden";
import Show from "./pages/campaigns/Show";
import New from "./pages/campaigns/New";
import Interact from "./pages/campaigns/Interact";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem(IS_DARK_MODE) || prefersDarkMode.toString());

    let theme: Theme = createTheme({
        palette: {
            mode: (isDarkMode === 'false') ? 'light' : 'dark', // mediaquery on dark theme
            // primary: {main: blue[500]},
            // secondary: red,
        },
    });
    theme = responsiveFontSizes(theme);

    // useEffect(() => {
    //     setIsDarkMode(prefersDarkMode.toString())
    // }, [prefersDarkMode])

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.style.setProperty("--root-link-color", 'hsl(210,100%,50%)')
            document.documentElement.style.setProperty("--root-visited-link-color", 'hsl(210,40%,50%)')
        } else {
            document.documentElement.style.setProperty("--root-link-color", '')
            document.documentElement.style.setProperty("--root-visited-link-color", '')
        }
    }, [isDarkMode])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline/>
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                <Container maxWidth={"xl"}>
                    <Paper style={{borderRadius: "10px", minHeight: "70vh", padding: "10px"}}>
                        <Routes>
                            <Route path="/" element={<Overview/>}/>
                            <Route path="/campaigns/:address/interact" element={<Interact/>}/>
                            <Route path="/campaigns/:address" element={<Show/>}/>
                            <Route path="/campaigns/new" element={<New/>}/>
                            <Route path={FORBIDDEN_URL} element={<Forbidden/>}/>
                            <Route element={<NotFound/>}/>
                        </Routes>
                    </Paper>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
}

export default App;
