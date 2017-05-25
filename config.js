/**
 * Created by superXu on 2017/5/25.
 */

let path = require('path')
let util = require('./libs/util')
let wechat_file = path.join(__dirname, './config/wechat.txt')

const config = {
  wechat: {
    appId: 'wx2ebb0240f924a971',
    appsecret: '1c2be13eea7843a567a0fb115640978b',
    token: 'superxu',
    getAccessToken: function () {
      return util.readFileAsync(wechat_file)
    },
    saveAccessToken: function (data) {
      data = JSON.stringify(data)
      return util.writeFileAsync(wechat_file, data)
    }
  }
}

module.exports = config
