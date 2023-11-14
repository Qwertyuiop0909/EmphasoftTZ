export default class TokenStorage {
  static setAccessToken(token) {
    localStorage.setItem('access_token', token)
  }

  static getAccessToken() {
    return (localStorage.getItem('access_token'))
  }

  static logOut() {
    localStorage.removeItem('access_token')
  }
}
