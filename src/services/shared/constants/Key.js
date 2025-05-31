export const AUTH_KEY_STORAGE = 'dev_token';
export const REFRESH_AUTH_KEY_STORAGE = 'dev_long_token';
export const AUTH_KEY_OTP = 'verified';
export const CLASS_NAME_LAYOUT = 'main-content-view';
export const AUTH_KEY_EMAIL_RESET_PASS = 'email_reset'
export const getToken = () => {
    return localStorage.getItem(AUTH_KEY_STORAGE)
}
export const getLongToken = () => {
    return localStorage.getItem(REFRESH_AUTH_KEY_STORAGE)
}
export const removeToken = () => {
    return localStorage.removeItem(AUTH_KEY_STORAGE)
}
export const removeLongToken = () => {
    return localStorage.removeItem(REFRESH_AUTH_KEY_STORAGE)
}
export const saveToken = (token) => {
    localStorage.setItem(AUTH_KEY_STORAGE, token); 
}
export const saveLongToken = (token) => {
    localStorage.setItem(REFRESH_AUTH_KEY_STORAGE, token); 
}