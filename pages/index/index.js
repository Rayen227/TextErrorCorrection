// index.js
// 获取应用实例
const app = getApp();
const request = require('../../utils/request.js');
const dbf = require('../../utils/dbf.js');
const md5 = require('../../utils/md5.js');

Component({
    data: {
        onLaunch: true
    },
    pageLifetimes: {
        show() {

            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
                            app.globalData.openid = result.data.openid;
                            wx.cloud.database().collection('Users').where({
                                _openid: result.data.openid
                            }).get({
                                success: function (res) {
                                    if (res.data.length == 0) {

                                        wx.redirectTo({
                                            url: '../login/login',
                                            fail: console.error
                                        });
                                    } else {
                                        app.globalData.histqu = res.data[0].histqu;
                                        app.globalData.userInfo = res.data[0].userInfo;
                                    }

                                }
                            })

                        },
                        fail: console.error
                    });
                }
            })

            // this.ctor();
            this.docf = ['doc', 'docx', 'pdf', 'txt'];
            this.imgf = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif'];
            this.aduf = ['mp3', 'm4a', 'wav'];
            this.RQTYPE = ['text', 'image_write', 'image_print', 'audio'];

            const that = this
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0,
                    //isshow:true,
                });
            }

        }
    },


    methods: {

        start() {
            this.setData({
                onLaunch: false
            });
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0,
                    isshow: true
                });
            }
        },

        doc() {
            request.upload(this.docf, function (e) {
                if (!e) {
                    return;
                }
                request.readFile(e.tempFilePath, 'text', e.ext, function () {
                    wx.navigateTo({
                        url: '../files/files?type=document&ext=' + e.ext
                    });
                });
            });

        },

        adu() {

            request.upload(this.aduf, function (e) {
                if (!e) {
                    return;
                }

                request.readFile(e.tempFilePath, 'audio', e.ext, function () {
                    wx.navigateTo({
                        url: '../files/files?type=aduio&ext=' + e.ext
                    });
                });

            });
        },

        img() {
            var then = this;

            wx.showActionSheet({
                itemList: ['手写体', '印刷体'],
                itemColor: '#000000',
                success: (result) => {
                    wx.chooseImage({
                        count: 1,
                        sourceType: ['album'],
                        success: function (res) {

                            request.readFile(res.tempFilePaths[0], then.RQTYPE[result.tapIndex + 1],
                                res.tempFilePaths[0].fileType(), function () {

                                    wx.navigateTo({
                                        url: '../files/files?type=image&ext=' + res.tempFilePaths[0].fileType()
                                    });
                                });
                        }
                    });


                },
                fail: console.error
            });

        },

        text() {

            app.globalData.text = '';
            wx.navigateTo({
                url: '../files/files?type=text&ext=none'
            });
        },

    }
});