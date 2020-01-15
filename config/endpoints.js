// export const EVENT_ID = 4
// const BASE_URL = 'https://apps.sgdinstitute.org'
export const EVENT_ID = 1
const BASE_URL = 'http://enterprise.test'
const API_URL = '/api/gemini'
export const LOGIN_URL = BASE_URL + '/oauth/token'
export const USER_URL = BASE_URL + API_URL + '/me'
export const USER_ACTIVITIES_URL = BASE_URL + API_URL + '/me/activities'
export const SCHEDULES_URL = BASE_URL + API_URL + '/events/' + EVENT_ID + '/schedules'
export const ACTIVITIES_URL = BASE_URL + API_URL + '/events/' + EVENT_ID + '/activities'
export const ACTIVITIES_BY_DATE = ACTIVITIES_URL + '?groupBy=date'
export const LOCATIONS_URL = BASE_URL + API_URL + '/events/' + EVENT_ID + '/locations'
export const BULLETINS_URL = BASE_URL + API_URL + '/events/' + EVENT_ID + '/bulletins'