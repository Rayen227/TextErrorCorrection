// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad() {

    },

    doc() {
        wx.navigateTo({
            url: '../files/files?type=document'
        });
    },

    adu() {
        wx.navigateTo({
            url: '../files/files?type=aduio'
        });
    },

    img() {
        wx.navigateTo({
            url: '../files/files?type=image'
        });
    },

    text() {
        wx.navigateTo({
            url: '../files/files?type=text'
        });
    }

})
