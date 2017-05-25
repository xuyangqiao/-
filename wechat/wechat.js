/**
 * Created by superXu on 2017/5/23.
 */

let Promise = require('bluebird')
let request = Promise.promisify(require('request'))
let util = require('./util')
const prefix = 'https://api.weixin.qq.com/cgi-bin/'
const api = {
  accessToken: prefix + 'token?grant_type=client_credential'
}

/*
 * Wechat构造函数，处理access_token
 *
 * */
function Wechat(opts) {
  this.appId = opts.appId
  this.appSecret = opts.appsecret
  this.getAccessToken = opts.getAccessToken
  this.saveAccessToken = opts.saveAccessToken

  this.getAccessToken().then((data) => {
    try {
      data = JSON.parse(data)
    }
    catch (e) {
      return this.updateAccessToken(data)
    }

    if (this.isValidAccessToken(data)) {
      Promise.resolve(data)
    } else {
      return this.updateAccessToken()
    }
  }).then((data) => {
    this.access_token = data.access_token
    this.expires_in = data.expires_in

    this.saveAccessToken(data)
  })
}

/*
 * 验证access_token 合法性
 * */
Wechat.prototype.isValidAccessToken = (data) => {
  if (!data || !data.access_token || !data.expires_in) {
    return false
  }

  let access_token = data.access_token
  let expires_in = data.expires_in
  let now = (new Date().getTime())

  if (now < expires_in) {
    return true
  } else {
    return false
  }
}

/*
 * 更新access_token
 *
 * */
Wechat.prototype.updateAccessToken = function () {
  let appId = this.appId
  let appSecret = this.appSecret
  let url = api.accessToken + '&appid=' + appId + '&secret=' + appSecret
  return new Promise(function (resolve, reject) {
    request({url: url, json: true}).then(function (response) {
      let data = response.body
      let now = (new Date().getTime())
      let expires_in = now + (data.expires_in - 20) * 1000
      data.expires_in = expires_in

      resolve(data)
    })
  })
}

Wechat.prototype.reply = function () {
  let content = this.body
  let message = this.weixin
  let xml = util.tpl(content, message)

  this.status = 200
  this.type = 'application/xml'
  this.body = xml
}

module.exports = Wechat
