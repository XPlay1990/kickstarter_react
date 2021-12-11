import React, {useEffect} from 'react';
import './App.css';
import {
    Box,
    Container,
    createTheme,
    CssBaseline,
    IconButton,
    Paper,
    responsiveFontSizes,
    Theme,
    useMediaQuery
} from "@mui/material";
import {ThemeProvider} from "@mui/system";
import Header from "./components/Header";
import {Route, Routes, useNavigate} from 'react-router-dom';
import Overview from "./pages/Overview";
import NotFound from "./pages/error/NotFound";
import {FORBIDDEN_URL, IS_DARK_MODE} from "./config/AppConstants";
import Forbidden from "./pages/error/Forbidden";
import Show from "./pages/campaigns/Show";
import New from "./pages/campaigns/New";
import Contribute from "./pages/campaigns/interact/Contribute";
import CreateRequest from "./pages/campaigns/interact/CreateRequest";
import ApproveRequest from "./pages/campaigns/interact/ApproveRequest";
import FinalizeRequest from "./pages/campaigns/interact/FinalizeRequest";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';

function App() {
    const navigate = useNavigate()
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
            <CssBaseline/>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                <Container style={{maxWidth: "80%"}}>
                    <Paper style={{borderRadius: "10px", minHeight: "75vh", padding: "10px"}}>
                        <Box display={"flex"} gap={"10px"}>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="medium"
                                onClick={() => {
                                    navigate("/")
                                }}
                            >
                                <HomeIcon/>
                            </IconButton>
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="medium"
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                        </Box>
                        <Routes>
                            <Route path="/" element={<Overview/>}/>
                            <Route path="/campaigns/:address">
                                <Route path="show" element={<Show/>}/>
                                <Route path="contribute" element={<Contribute/>}/>
                                <Route path="request/create" element={<CreateRequest/>}/>
                                <Route path="request/:id/approve" element={<ApproveRequest/>}/>
                                <Route path="request/:id/finalize" element={<FinalizeRequest/>}/>
                            </Route>
                            <Route path="/campaigns/new" element={<New/>}/>
                            <Route path={FORBIDDEN_URL} element={<Forbidden/>}/>
                            <Route element={<NotFound/>}/>
                        </Routes>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
        ;
}

export default App;
