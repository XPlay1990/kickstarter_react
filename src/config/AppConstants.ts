// export const API_BASE_URL = process.env.API_BASE_URL || process.env.NODE_ENV === 'production' ? 'http://api.qd-software.de' : 'http://localhost:8080'; //'http://ec2-18-184-142-66.eu-central-1.compute.amazonaws.com:9020';
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:9020'//'http://192.168.33.10:8080'; //'http://ec2-18-184-142-66.eu-central-1.compute.amazonaws.com:9020';
// export const OAUTH2_REDIRECT_URI = process.env.API_BASE_URL || process.env.NODE_ENV === 'production' ? 'https://qd-software.de/oauth2/redirect' : 'http://localhost:3000/oauth2/redirect'
export const OAUTH2_REDIRECT_URI = process.env.API_BASE_URL || 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const OKTA_AUTH_URL = API_BASE_URL + '/oauth2/authorize/okta?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const APP_PATH_LandingPage = "/"
export const APP_PATH_OVERVIEW = APP_PATH_LandingPage
export const APP_PATH_LOGIN = "/login"
export const APP_PATH_SIGNUP = "/signup"
export const APP_PATH_REDIRECT = "/oauth2/redirect"
export const APP_PATH_CAMPAIGNS = (campaignAddress: string) => `/campaigns/${campaignAddress}`
export const APP_PATH_CAMPAIGN_SHOW = (campaignAddress: string) => `${APP_PATH_CAMPAIGNS(campaignAddress)}/show`
export const APP_PATH_CAMPAIGN_CONTRIBUTE = (campaignAddress: string) => `${APP_PATH_CAMPAIGNS(campaignAddress)}/contribute`
export const APP_PATH_CAMPAIGN_REQUEST = (campaignAddress: string) => `${APP_PATH_CAMPAIGNS(campaignAddress)}/request`
export const APP_PATH_CAMPAIGN_REQUEST_CREATE = (campaignAddress: string) => `${APP_PATH_CAMPAIGN_REQUEST(campaignAddress)}/create`
export const APP_PATH_CAMPAIGN_REQUEST_APPROVE = (campaignAddress: string, id: number) => `${APP_PATH_CAMPAIGN_REQUEST(campaignAddress)}/${id}/approve`
export const APP_PATH_CAMPAIGN_REQUEST_FINALIZE = (campaignAddress: string, id: number) => `${APP_PATH_CAMPAIGN_REQUEST(campaignAddress)}/${id}/finalize`
export const APP_PATH_PROFILE = "/profile"
export const APP_PATH_FORBIDDEN = "/forbidden"

export const LOCALSTORAGE_IS_DARK_MODE = 'darkMode';
export const LOCALSTORAGE_AUTHENTICATION = 'BearerToken'
