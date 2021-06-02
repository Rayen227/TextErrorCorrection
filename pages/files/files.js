// pages/files/files.js
const md5 = require('../../utils/md5.js');
const window = require('../../utils/window.js');
const dbf = require('../../utils/dbf.js');
const app = getApp();
// const time = new Date();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        acFileType: ['.docx', '.pdf', '.txt', '.doc'],
        scale: {},
        resli: [],
        iconSrc: '',
        iconVis: "none",
        btnVis: "none",
        curText: "",
        topImage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        window.loading("加载中");

        this.ctor();

        this.curText = app.globalData.text;
        app.globalData.text = "";

        this.setData({
            topImage: 'cloud://test-h8qbc.7465-test-h8qbc-1301182329/textCorr/source/' + options.type + '.png',
            curText: this.curText
        });

    },


    ctor() {
        this.curRes = [];
        this.curText = '';
    },

    setRes() {
        var rli = [];
        for (var i = 0; i < this.curRes.length; i++) {
            rli[i] = { 'text': this.curRes[i].text, 'bg': this.curRes[i].tag == 0 ? "white" : "#00B26A" }
        }


        this.setData({
            resli: rli
        });

    },


    input(e) {
        this.curText = e.detail.value;
    },

    submmit() {

        window.loading("纠错中");

        var then = this;
        wx.request({
            url: 'http://42.192.50.88:5000/correct',
            data: {
                text: then.curText
            },
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
                if (res.data.code != 2000) {
                    window.error(res.data.code);
                    return;
                }

                window.success("纠错成功");

                then.curRes = res.data.data.result;
                then.setRes();

                var d = new Date();
                var time = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();


                var his = {
                    time: time,
                    title: then.curText.substr(0, 8) + "...",
                    bef: then.curText,
                    aft: then.curRes
                };

                app.globalData.histqu.push(his);

                dbf.updateHis(app.globalData.openid, app.globalData.histqu, function (res) { });

            },
            fail: () => {

            },
            complete: () => { }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        window.noloading();
        window.success("加载完成");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});