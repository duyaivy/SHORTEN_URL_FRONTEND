/**
 * Date-time constants
 */
export const STANDARD_DATE_REGEX = /^[0-9]{4}-[0-9]{2}-[0-9]{2}?$/
export const STANDARD_TIME_REGEX = /^[0-9]{2}:[0-9]{2}?$/
export const STANDARD_DATE_FORMAT_FULL = 'DD/MM/YYYY HH:mm'
export const STANDARD_DATE_FORMAT_FULL_TIME = 'DD-MM-YYYY HH:mm:ss'
export const PHONE_NUMBER_REGEX = /^[0-9\s()+-]*$/
export const DESCRIPTION_REGEX = /^[^\t\n]*$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
/**
 * Filter constants
 */
// export const DEFAULT_TAKE = 20;
export const DEFAULT_PAGE_SIZE = 20

/**
 * url constants
 */

export const ACTION_URL_REGEX = /^(\/?rpc)/

/**
 * string empty constants
 */
export const EMPTY_STRING = '---'
export const TIME_FORMAT = 'HH:mm'

export const DAY_TYPE = 'day'
// config type text
export const TEXT_TYPE = 'text'
export const NUMBER_TYPE = 'number'
export const PASSWORD_TYPE = 'password'

// config time
export const STATE_TIME = 60 * 1000 * 2
export const DEFAULT_DATE_OF_BIRTH = '2000-01-01'
export const VND_CURRENCY_UNIT = 'VND'

// i18n
export const languagesDefault = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' }
]
