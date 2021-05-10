const request = require('../../utils/request.js');
var app = getApp(),
    rm = wx.getRecorderManager();
//录音停止时调用
rm.onStop(function (e) {
    var a = this;

    console.log(e);

    request.readFile(e.tempFilePath, 'audio', 'mp3', function (e) {
        console.log(">>>", e);
    });

    // wx.showLoading({
    //     title: "正在识别..."
    // });

    //上传逻辑
    // var n = {
    //     url: app.globalData.url + "upload",
    //     filePath: e.tempFilePath,
    //     name: "music",
    //     header: {
    //         "Content-Type": "application/json"
    //     },
    //     success: function (res) {
    //         // wx.hideLoading({});
    //         console.log(res);
    //     },
    //     fail: console.error
    // };
    // wx.uploadFile(n);
}),
    Page({

        /**
         * 页面的初始数据
         */
        data: {
            hasRecord: false,
            isDot: "block",
            isTouchStart: false,
            isTouchEnd: false,
            value: '100',
            touchStart: 0,
            touchEnd: 0,
            vd: '',
            color: "rgb(212, 76, 76)",
            on: false,
            hours: '0' + 0,   // 时
            minute: '0' + 0,   // 分
            second: '0' + 0    // 秒
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            var a = this;
            wx.authorize({
                scope: "scope.record",
                success: function () {
                    console.log("录音授权成功");
                },
                fail: function () {
                    console.log("录音授权失败");
                }
            }), a.onShow()

        },
        // 点击录音按钮
        onRecordClick: function () {
            wx.getSetting({
                success: function (t) {
                    console.log(t.authSetting), t.authSetting["scope.record"] ? console.log("已授权录音") : (console.log("未授权录音"),
                        wx.openSetting({
                            success: function (t) {
                                console.log(t.authSetting);
                            }
                        }));
                }
            });
        },
        /**
         * 长按录音开始
         */
        recordStart: function (e) {
            this.data.on = !this.data.on;
            this.setData({
                on: this.data.on,
                hours: '0' + 0,   // 时
                minute: '0' + 0,   // 分
                second: '0' + 0    // 秒
            });
            if (!this.data.on) {
                this.recordTerm();
                return;
            }
            var n = this;
            rm.start({
                format: "mp3",
                sampleRate: 32e3,
                encodeBitRate: 192e3
            }), n.setData({
                touchStart: e.timeStamp,
                isTouchStart: true,
                isTouchEnd: false,
                showPg: true,
            })
            // var a = 15, o = 10;
            // this.timer = setInterval(function () {
            //     n.setData({
            //         value: n.data.value - 100 / 1500
            //     }), (o += 10) >= 1e3 && o % 1e3 == 0 && (a--, console.log(a), a <= 0 && (rm.stop(),
            //         clearInterval(n.timer), n.animation2.scale(1, 1).step(), n.setData({
            //             animationData: n.animation2.export(),
            //             showPg: false,
            //         })));
            // }, 10);

            const that = this
            var second = that.data.second
            var minute = that.data.minute
            var hours = that.data.hours
            this.timer = setInterval(function () {  // 设置定时器
                second++
                if (second >= 60) {
                    second = 0  //  大于等于60秒归零
                    minute++
                    if (minute >= 60) {
                        minute = 0  //  大于等于60分归零
                        hours++
                        if (hours < 10) {
                            // 少于10补零
                            that.setData({
                                hours: '0' + hours
                            })
                        } else {
                            that.setData({
                                hours: hours
                            })
                        }
                    }
                    if (minute < 10) {
                        // 少于10补零
                        that.setData({
                            minute: '0' + minute
                        })
                    } else {
                        that.setData({
                            minute: minute
                        })
                    }
                }
                if (second < 10) {
                    // 少于10补零
                    that.setData({
                        second: '0' + second
                    })
                } else {
                    that.setData({
                        second: second
                    })
                }
            }, 1000);


        },
        /**
         * 长按录音结束
         */
        recordTerm: function (e) {
            rm.stop(), this.setData({
                isTouchEnd: true,
                isTouchStart: false,
                // touchEnd: e.timeStamp,
                showPg: false,
                value: 100
            }), clearInterval(this.timer);
        }
    });