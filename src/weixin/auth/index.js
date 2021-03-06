import { callWxOpenApi, buildUrl } from '../normalize'

export default class Auth {
  constructor (options) {
    this.options = Object.assign({
      baseUrl: 'https://api.weixin.qq.com',
      timeout: 5000
    }, options)
  }

  async _requestWxOpenapi ({ name, url, data, options }) {
    const defaultOptions = {
      method: 'GET',
      dataType: 'json',
      dataAsQueryString: true,
      timeout: this.options.timeout
    }
    const result = await callWxOpenApi({
      name: `auth.${name}`,
      url: `${this.options.baseUrl}${buildUrl(url, data)}`,
      data,
      options,
      defaultOptions
    })
    return result
  }

  async getPaidUnionId (data) {
    const url = '/wxa/getpaidunionid'
    const result = await this._requestWxOpenapi({
      name: 'getPaidUnionId',
      url,
      data
    })
    return result
  }

  async getAccessToken () {
    const url = '/cgi-bin/token'
    const result = await this._requestWxOpenapi({
      name: 'getAccessToken',
      url,
      data: {
        grant_type: 'client_credential',
        appid: this.options.appId,
        secret: this.options.secret
      }
    })
    return result
  }
}
