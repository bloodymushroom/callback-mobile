import Store from '../data/store'

export default config = {
  host: 'http://jobz.mooo.com:3000', 
  // host: 'http://10.6.21.132:3000',
  // host: 'http://jobz.mooo.com:3000',
  request: {
    headers: {
      credentials: Store.idToken
    }
  }
}