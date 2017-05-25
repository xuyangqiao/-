/**
 * Created by superXu on 2017/5/25.
 */

exports.reply = function* (next) {
  let message = this.weixin

  if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') {
      if (message.EventKey) {
        console.log('扫描二维码进入：' + message.EventKey + ' ' + message.ticket)
      }

      this.body = '哈哈，你订阅了找个号\r\n' + ' 消息ID：' + message.MsgId
    }

    else if (message.Event === 'unsubscribe') {
      console.log('无情取关注')
      this.body = ''
    }
  }
  else {

  }

  yield next
}