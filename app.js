/**
 * Created by superXu on 2017/5/23.
 */

let Koa = require('koa')
let wechat = require('./wechat/g')
let path = require('path')
let util = require('./libs/util')
let config = require('./config')
let weixin = require('./weixin')
let wechat_file = path.join(__dirname, './config/wechat.txt')

let app = new Koa()

app.use(wechat(config.wechat, weixin.reply))

app.listen(8888)

console.log('程序启动，端口号：8888')