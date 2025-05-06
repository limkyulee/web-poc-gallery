export const KEY = {
  KEY_ACCESS_TOKEN: "KEY_ACCESS_TOKEN"
} as const

const getAccessToken = () => {
  return localStorage.getItem(KEY.KEY_ACCESS_TOKEN)
}

const setAccessToken = (accessToken: string) => {
  localStorage.setItem(KEY.KEY_ACCESS_TOKEN, accessToken)
}

const clearAccessToken = () => {
  localStorage.removeItem(KEY.KEY_ACCESS_TOKEN)
}

export const setToken = (accessToken: string) => {
  setAccessToken(accessToken)
}