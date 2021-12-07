export const APP_PATH_LandingPage = "/"
export const APP_PATH_OVERVIEW = APP_PATH_LandingPage
export const APP_CAMPAIGNS = "/campaigns"
export const APP_CAMPAIGN_SHOW = (campaignAddress: string) => `${APP_CAMPAIGNS}/${campaignAddress}`
export const APP_CAMPAIGN_INTERACT = (campaignAddress: string) => `${APP_CAMPAIGN_SHOW(campaignAddress)}/interact`
export const APP_PATH_ARTICLES = "/articles"
export const APP_PATH_STOCKS = "/stocks"
export const APP_PATH_CALCULATOR = "/calculator"
export const APP_PATH_SUPPORT_US = "/support-us"
export const APP_PATH_COMMUNITY = "/community"
export const FORBIDDEN_URL = "/forbidden"

export const APP_LOCALSTORAGE_ID = "ID"

export const IS_DARK_MODE = 'darkMode';