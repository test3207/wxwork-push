企业微信消息推送

## 准备工作

这个服务的应用对象是已经开通企业微信的组织，通过调用企业微信官方的API，指定用于推送消息的应用，给组织内部指定的员工推送消息。

你必须要有企业微信的管理员权限，才可以获得**CORPSECRET**和**CORPID**；

你需要在企业微信内，新建一个第三方应用，或者复用一个之前已经创建好的第三方应用，作为消息推送的指定应用，获得**AGGENTID**；

你需要在企业微信通讯录中获取推送人员的**userId**，注意这与微信的openId/unionId/wechatId没什么关系。

更详细的获取以上所有信息的说明，请参见[官方文档](https://work.weixin.qq.com/api/doc#90000/90135/90664)

## 安装

```bash
$ npm install wxwork-push --save
```

支持 Node.js 8.x 及以上版本。

## 示例

```
const { wxWorkPushOpt } = {
  wxWorkPushOpt: {
    CORPSECRET: '4e***************************************wU', // 填入你的企业微信CORPSECRET
    CORPID: 'ww**************ca', // 填入你的企业微信CORPID
    AGGENTID: '10***07' // 填入你要推送消息的应用AGGENTID
  }
}
const WxPush = require('wxwork-push')
const wxPush = new WxPush(wxWorkPushOpt)
wxPush.send({
  user: 'test3207', // 填入你要推送的用户
  content: 'This is a test message' // 填入你要推送的文本消息
})

```
