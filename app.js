// app.js
const dbf = require('./utils/dbf.js');
const md5 = require('./utils/md5.js');

App({
    onLaunch() {

        wx.cloud.init({
            env: 'test-h8qbc'
        });

        // console.log(md5);
        // 登录
        var then = this;
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                // console.log(res);
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                        appid: 'wxd4a2c5fb5db0bc10',
                        secret: '03867d28d4a9b6c6f291f55f880592c9',
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    },
                    header: { 'content-type': 'application/json' },
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result) => {
                        then.globalData.openid = result.data.openid;
                        // console.log(then.globalData.openid);
                        wx.cloud.database().collection('Users').where({
                            uid: md5.hex_md5(result.data.openid)
                        }).get({
                            success: function (res) {
                                if (res.data.length == 0) {
                                    wx.redirectTo({
                                        url: '../login/login',
                                        fail: function (err) {
                                            console.log(err);
                                        }
                                    });
                                }

                            }
                        })

                    },
                    fail: () => { },
                    complete: () => { }
                });
            }
        })
    },
    globalData: {
        userInfo: null,
        openid: null,
        text: '',
        isshow: 0
    }
});


String.prototype.fileType = function () {
    var i = this.lastIndexOf(".");
    return this.substring(i + 1);
};
