Weixin(enterprise edtion) send application message

## Preparation

You can send messages to the specific employee(s) of your company by call the official apis.
You MUST have the administrator permissions to get **CORPSECRET** and **CORPID**.
You MUST new an 3rd-party application or reuse an exsit one as the specific application to send message and get **AGGENTID**.
You MUST get the **userId(s)** of the person(s) you want to send message in work-weixin's contacts list.
For more details how to get the infomation above, please checkout [Official Docs](https://work.weixin.qq.com/api/doc#90000/90135/90664)

## Installation

```bash
$ npm install wxwork-push --save
```

Node.js >= 8.0.0 required.

## Example

```
const { wxWorkPushOpt } = {
  wxWorkPushOpt: {
    CORPSECRET: '4e***************************************wU', // input your CORPSECRET
    CORPID: 'ww**************ca', // input your CORPID
    AGGENTID: '10***07' // input your AGGENTID
  }
}
const WxPush = require('wxwork-push')
const wxPush = new WxPush(wxWorkPushOpt)
wxPush.send({
  user: 'test3207', // input the userId(s)
  content: 'This is a test message' // input the message you want to send
})

```