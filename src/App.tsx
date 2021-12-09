import React, {useEffect} from 'react';
import './App.css';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    Paper,
    responsiveFontSizes,
    Theme,
    useMediaQuery
} from "@mui/material";
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
            mode: (isDarkMode === 'false') ? 'light' : 'dark'
        },
    });
    theme = responsiveFontSizes(theme);

    useEffect(() => {
        setIsDarkMode(prefersDarkMode.toString())
    }, [prefersDarkMode])

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline/>
                <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                    <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                    <Container style={{maxWidth: "80%"}}>
                        <Paper style={{borderRadius: "10px", minHeight: "75vh", padding: "10px"}}>
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
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
        ;
}

export default App;
