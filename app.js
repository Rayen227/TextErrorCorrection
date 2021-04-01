// app.js

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
                console.log(res);
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

                    },
                    fail: () => { },
                    complete: () => { }
                });
            }
        })
    },
    globalData: {
        userInfo: null,
        openid: null
    }
});


String.prototype.fileType = function () {
    var i = this.lastIndexOf(".");
    return this.substring(i);
};
