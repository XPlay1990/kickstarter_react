export const APP_PATH_LandingPage = "/"
export const APP_PATH_OVERVIEW = APP_PATH_LandingPage
export const APP_CAMPAIGNS = (campaignAddress: string) => `/campaigns/${campaignAddress}`
export const APP_CAMPAIGN_SHOW = (campaignAddress: string) => `${APP_CAMPAIGNS(campaignAddress)}/show`
export const APP_CAMPAIGN_CONTRIBUTE = (campaignAddress: string) => `${APP_CAMPAIGNS(campaignAddress)}/contribute`
export const APP_CAMPAIGN_REQUEST = (campaignAddress: string) => `${APP_CAMPAIGNS(campaignAddress)}/request`
export const APP_CAMPAIGN_REQUEST_CREATE = (campaignAddress: string) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/create`
export const APP_CAMPAIGN_REQUEST_APPROVE = (campaignAddress: string, id: number) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/${id}/approve`
export const APP_CAMPAIGN_REQUEST_FINALIZE = (campaignAddress: string, id: number) => `${APP_CAMPAIGN_REQUEST(campaignAddress)}/${id}/finalize`
export const FORBIDDEN_URL = "/forbidden"

export const IS_DARK_MODE = 'darkMode';