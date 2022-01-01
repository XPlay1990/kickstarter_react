import React from 'react';
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
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import Overview from "./pages/Overview";
import NotFound from "./pages/error/NotFound";
import {
    APP_PATH_OVERVIEW,
    APP_PATH_FORBIDDEN,
    LOCALSTORAGE_IS_DARK_MODE,
    LOCALSTORAGE_AUTHENTICATION,
    APP_PATH_LOGIN, APP_PATH_SIGNUP, APP_PATH_REDIRECT
} from "./config/AppConstants";
import Forbidden from "./pages/error/Forbidden";
import Show from "./pages/campaigns/Show";
import New from "./pages/campaigns/New";
import Contribute from "./pages/campaigns/interact/Contribute";
import CreateRequest from "./pages/campaigns/interact/CreateRequest";
import ApproveRequest from "./pages/campaigns/interact/ApproveRequest";
import FinalizeRequest from "./pages/campaigns/interact/FinalizeRequest";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HomeIcon from '@mui/icons-material/Home';
import CampaignBase from "./pages/campaigns/CampaignBase";
import './animation.css'
import FavIcon from './resources/qd_software_logo.png'
import Login from "./pages/user/login/Login";
import Signup from "./pages/user/signup/Signup";
import OAuth2RedirectHandler from "./oauth2/OAuth2RedirectHandler";

function App() {
    const navigate = useNavigate()
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem(LOCALSTORAGE_IS_DARK_MODE) || prefersDarkMode.toString());

    const authentication = localStorage.getItem(LOCALSTORAGE_AUTHENTICATION)
    const isAuthenticated: boolean = !!authentication

    let theme: Theme = createTheme({
        palette: {
            mode: (isDarkMode === 'false') ? 'light' : 'dark'
        },
    });
    theme = responsiveFontSizes(theme);

    function animation() {
        return (
            <Box className="bg">
                {/*<div className="background background0"></div>*/}
                {/*<div className="background background1"></div>*/}
                {/*<div className="background background2"></div>*/}
                {/*<div className="background background3"></div>*/}
                {/*<div className="background background4"></div>*/}
                {/*<div className="background background5"></div>*/}
                {/*<div className="background background6"></div>*/}
                {/*<div className="background background7"></div>*/}
                <div className="criterion">
                    <div className="text text0">W</div>
                    <div className="text text1">e</div>
                    <div className="text text2">l</div>
                    <div className="text text3">c</div>
                    <div className="text text4">o</div>
                    <div className="text text5">m</div>
                    <div className="text text6">e</div>
                    <div className="text text7">:)</div>
                    {/*<div className="text text7"><img src={FavIcon} alt={""} width={"150px"}/></div>*/}
                    <div className="frame frame0"/>
                    <div className="frame frame1"/>
                    <div className="frame frame2"/>
                    <div className="frame frame3"/>
                    <div className="frame frame4"/>
                    <div className="frame frame5"/>
                    <div className="frame frame6"/>
                    <div className="frame frame7"/>
                    <div className="particle particle00"/>
                    <div className="particle particle01"/>
                    <div className="particle particle02"/>
                    <div className="particle particle03"/>
                    <div className="particle particle04"/>
                    <div className="particle particle05"/>
                    <div className="particle particle06"/>
                    <div className="particle particle07"/>
                    <div className="particle particle08"/>
                    <div className="particle particle09"/>
                    <div className="particle particle010"/>
                    <div className="particle particle011"/>
                    <div className="particle particle10"/>
                    <div className="particle particle11"/>
                    <div className="particle particle12"/>
                    <div className="particle particle13"/>
                    <div className="particle particle14"/>
                    <div className="particle particle15"/>
                    <div className="particle particle16"/>
                    <div className="particle particle17"/>
                    <div className="particle particle18"/>
                    <div className="particle particle19"/>
                    <div className="particle particle110"/>
                    <div className="particle particle111"/>
                    <div className="particle particle20"/>
                    <div className="particle particle21"/>
                    <div className="particle particle22"/>
                    <div className="particle particle23"/>
                    <div className="particle particle24"/>
                    <div className="particle particle25"/>
                    <div className="particle particle26"/>
                    <div className="particle particle27"/>
                    <div className="particle particle28"/>
                    <div className="particle particle29"/>
                    <div className="particle particle210"/>
                    <div className="particle particle211"/>
                    <div className="particle particle30"/>
                    <div className="particle particle31"/>
                    <div className="particle particle32"/>
                    <div className="particle particle33"/>
                    <div className="particle particle34"/>
                    <div className="particle particle35"/>
                    <div className="particle particle36"/>
                    <div className="particle particle37"/>
                    <div className="particle particle38"/>
                    <div className="particle particle39"/>
                    <div className="particle particle310"/>
                    <div className="particle particle311"/>
                    <div className="particle particle40"/>
                    <div className="particle particle41"/>
                    <div className="particle particle42"/>
                    <div className="particle particle43"/>
                    <div className="particle particle44"/>
                    <div className="particle particle45"/>
                    <div className="particle particle46"/>
                    <div className="particle particle47"/>
                    <div className="particle particle48"/>
                    <div className="particle particle49"/>
                    <div className="particle particle410"/>
                    <div className="particle particle411"/>
                    <div className="particle particle50"/>
                    <div className="particle particle51"/>
                    <div className="particle particle52"/>
                    <div className="particle particle53"/>
                    <div className="particle particle54"/>
                    <div className="particle particle55"/>
                    <div className="particle particle56"/>
                    <div className="particle particle57"/>
                    <div className="particle particle58"/>
                    <div className="particle particle59"/>
                    <div className="particle particle510"/>
                    <div className="particle particle511"/>
                    <div className="particle particle60"/>
                    <div className="particle particle61"/>
                    <div className="particle particle62"/>
                    <div className="particle particle63"/>
                    <div className="particle particle64"/>
                    <div className="particle particle65"/>
                    <div className="particle particle66"/>
                    <div className="particle particle67"/>
                    <div className="particle particle68"/>
                    <div className="particle particle69"/>
                    <div className="particle particle610"/>
                    <div className="particle particle611"/>
                    <div className="particle particle70"/>
                    <div className="particle particle71"/>
                    <div className="particle particle72"/>
                    <div className="particle particle73"/>
                    <div className="particle particle74"/>
                    <div className="particle particle75"/>
                    <div className="particle particle76"/>
                    <div className="particle particle77"/>
                    <div className="particle particle78"/>
                    <div className="particle particle79"/>
                    <div className="particle particle710"/>
                    <div className="particle particle711"/>
                </div>
            </Box>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
                {/*{animation()}*/}
                <Container style={{maxWidth: "80%"}}>
                    <Paper style={{
                        borderRadius: "10px",
                        minHeight: "75vh",
                        padding: "10px",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Box display={"flex"} width={"100%"} gap={"10px"}>
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
                            <Route path={APP_PATH_LOGIN} element={<Login isAuthenticated={isAuthenticated}/>}/>
                            <Route path={APP_PATH_SIGNUP} element={<Signup isAuthenticated={isAuthenticated}/>}/>
                            <Route path={APP_PATH_REDIRECT} element={<OAuth2RedirectHandler/>}/>

                            <Route path={APP_PATH_OVERVIEW}
                                   element={isAuthenticated ? <Overview/> : <Navigate to={APP_PATH_LOGIN}/>}/>
                            <Route path="/campaigns/:address" element={isAuthenticated ? <CampaignBase/> :
                                <Navigate to={APP_PATH_LOGIN} replace/>}>
                                <Route path="show"
                                       element={isAuthenticated ? <Show/> : <Navigate to={APP_PATH_LOGIN} replace/>}/>
                                <Route path="contribute" element={isAuthenticated ? <Contribute/> :
                                    <Navigate to={APP_PATH_LOGIN} replace/>}/>
                                <Route path="request/create" element={isAuthenticated ? <CreateRequest/> :
                                    <Navigate to={APP_PATH_LOGIN} replace/>}/>
                                <Route path="request/:id/approve" element={isAuthenticated ? <ApproveRequest/> :
                                    <Navigate to={APP_PATH_LOGIN} replace/>}/>
                                <Route path="request/:id/finalize" element={isAuthenticated ? <FinalizeRequest/> :
                                    <Navigate to={APP_PATH_LOGIN} replace/>}/>
                            </Route>
                            <Route path="/campaigns/new"
                                   element={isAuthenticated ? <New/> : <Navigate to={APP_PATH_LOGIN} replace/>}/>

                            <Route path={APP_PATH_FORBIDDEN} element={<Forbidden/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
