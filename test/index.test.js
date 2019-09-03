'use strict'
const { wxWorkPushOpt } = require('../temp/config.json')
const WxPush = require('../index.js')
const wxPush = new WxPush(wxWorkPushOpt)
wxPush.send({
  user: wxWorkPushOpt.user,
  content: wxWorkPushOpt.content
})
