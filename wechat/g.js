/**
 * Created by superXu on 2017/5/23.
 */

let sha1 = require('sha1')
let getRawBody = require('raw-body')
let Wechat = require('./wechat')
let util = require('./util')

module.exports = function (opts) {
  // let wechat = new Wechat(opts)
  return function *(next) {
    const token = opts.token
    const signature = this.query.signature
    const nonce = this.query.nonce
    const timestamp = this.query.timestamp
    const echostr = this.query.echostr

    let str = [token, timestamp, nonce].sort().join('')
    let sha = sha1(str)

    if (this.method === 'GET') {
      if (sha === signature) {
        this.body = echostr + ''
      } else {
        this.body = 'wrong'
      }
    } else if (this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong'
        return false
      } else {
        let data = yield getRawBody(this.req, {
          length: this.length,
          limit: '1mb',
          encoding: this.charset
        })

        let content = yield util.parseXMLAsync(data)
        let message = util.formatMessage(content.xml)

        this.weixin = message

        yield handler.call(this, next)

        wechat.reply.call(this)
      }
    }
  }
}

