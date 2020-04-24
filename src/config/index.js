console.log('env: ', process.env.NODE_ENV)
const env = process.env.NODE_ENV || 'production'
const config = {
  development: {
    baseUrl: '/api/v1',
    restapiBaseUrl: '/restapi/v1'
  },
  production: {
    referer: 'https://xpt.ziubao.com/',
    baseUrl: '/xpt/api/v1',
    // baseUrl: '/test/api/v1',
    restapiBaseUrl: 'https://xpt.ziubao.com/restapi/v1'
    // baseUrl: '/api/v1',
    // restapiBaseUrl: '/restapi/v1'
  }
}

export default config[env]
