// pages/login/login.js
const app = getApp();
const md5 = require('./../../utils/md5.js');
const dbf = require('./../../utils/dbf.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: true
    },
    /**

  * 生命周期函数--监听页面加载

  */

    onLoad: function (options) {

        var that = this;

        //查看是否授权

        wx.getSetting({

            success: function (res) {

                if (res.authSetting['scope.userInfo']) {

                    console.log("用户授权了");

                } else {

                    //用户没有授权

                    console.log("用户没有授权");

                }

            }

        });

    },
    bindGetUserInfo: function (res) {

        if (res.detail.userInfo) {
            dbf.init(app.globalData.openid, res.detail.userInfo, function (res) {
                wx.switchTab({
                    url: '../index/index'
                });
            });

        } else {

            //用户按了拒绝按钮

            wx.showModal({

                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {

                    // 用户没有授权成功，不需要改变 isHide 的值

                    if (res.confirm) {

                        console.log('用户点击了“返回授权”');

                    }

                }

            });

        }

    }

});