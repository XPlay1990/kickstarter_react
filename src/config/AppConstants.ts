export const APP_PATH_LandingPage = "/"
export const APP_PATH_OVERVIEW = APP_PATH_LandingPage
export const APP_CAMPAIGNS = "/campaigns"
export const APP_CAMPAIGN_SHOW = (campaignAddress: string) => `${APP_CAMPAIGNS}/${campaignAddress}`
export const APP_CAMPAIGN_CONTRIBUTE = (campaignAddress: string) => `${APP_CAMPAIGN_SHOW(campaignAddress)}/contribute`
export const APP_CAMPAIGN_REQUEST = (campaignAddress: string) => `${APP_CAMPAIGN_SHOW(campaignAddress)}/request`
export const APP_CAMPAIGN_REQUEST_CREATE = (campaignAddress: string) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/create`
export const APP_CAMPAIGN_REQUEST_APPROVE = (campaignAddress: string) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/approve`
export const APP_CAMPAIGN_REQUEST_FINALIZE = (campaignAddress: string) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/finalize`
export const APP_PATH_ARTICLES = "/articles"
export const APP_PATH_STOCKS = "/stocks"
export const APP_PATH_CALCULATOR = "/calculator"
export const APP_PATH_SUPPORT_US = "/support-us"
export const APP_PATH_COMMUNITY = "/community"
export const FORBIDDEN_URL = "/forbidden"

export const APP_LOCALSTORAGE_ID = "ID"

export const IS_DARK_MODE = 'darkMode';