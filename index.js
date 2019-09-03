'use strict'
const axios = require('axios')
const fs = require('fs')

module.exports = class {
  constructor (options) {
    if (!options || !options.CORPID || !options.CORPSECRET || !options.AGGENTID) {
      throw new Error('wxwork-push Wrong Parameters!')
    }
    this.config = options
    try {
      this.tokenObj = require('./temp/token.json')
    } catch (e) { this.update() }
  }

  async update () {
    const { CORPID, CORPSECRET } = this.config
    const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${CORPID}&corpsecret=${CORPSECRET}`
    const res = await axios.get(url)
    if (!res || !res.data || res.data.errcode !== 0) {
      throw new Error('wxwork-push Auth Fail! Check Your CORPID AND CORPSECRET!')
    }
    this.tokenObj = res.data
    !fs.existsSync('./temp') && fs.mkdirSync('./temp')
    fs.writeFileSync('./temp/token.json', JSON.stringify(res.data))
    return res.data
  }

  get token () {
    return this.tokenObj && this.tokenObj.access_token ? this.tokenObj.access_token : ''
  }

  async get () {
    const tempUrl = arguments[0]
    arguments[0] = `${tempUrl}?access_token=${this.token}`
    let res = await axios.post.get(this, arguments)
    if (res && res.data && res.data.errcode !== 0) {
      await this.update()
      arguments[0] = `${tempUrl}?access_token=${this.token}`
      res = await axios.post.get(this, arguments)
    }
    return res
  }

  async post () {
    const tempUrl = arguments[0]
    arguments[0] = `${tempUrl}?access_token=${this.token}`
    let res = await axios.post.apply(this, arguments)
    if (res && res.data && res.data.errcode !== 0) {
      await this.update()
      arguments[0] = `${tempUrl}?access_token=${this.token}`
      res = await axios.post.apply(this, arguments)
    }
    return res
  }

  /**
   * send Msg
   * limit 30 times * usercount per day for one corp, limit 30 times per minute for one user
   * @param options Required Object
   * @param options.user Required Array-Receive List
   * @param options.content Required String-Content Detail
   * @return { errcode: 0, errmsg: 'ok', invaliduser: '' } success
   * @return { errcode: 40014, errmsg: 'invalid access_token' } fail
   */
  async send (options = {}) {
    if (!options || !options.user || !options.content || options.content === '') {
      throw new Error('wxwork-push Wrong Parameters!')
    }
    if (!Array.isArray(options.user)) {
      options.user = [String(options.user)]
    }
    const opts = {
      touser: options.user.join('|'),
      msgtype: 'text',
      agentid: this.config.AGGENTID,
      text: {
        content: options.content
      }
    }
    const url = 'https://qyapi.weixin.qq.com/cgi-bin/message/send'
    const res = await this.post(url, opts)
    return res
  }
}
