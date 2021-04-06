// pages/files/files.js
const md5 = require('../../utils/md5.js');
const app = getApp();
const time = new Date();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        acFileType: ['.docx', '.pdf', '.txt', '.doc']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    },

    upload() {
        var then = this;

        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            success(res) {

                // console.log(res);

                if (res.tempFiles[0].size >= 1000000) {
                    console.log('文件过大');
                    return;
                }

                var ac = false;

                for (var i = 0; i < then.data.acFileType.length; i++) {
                    if (res.tempFiles[0].name.fileType() == then.data.acFileType[i] ||
                        res.tempFiles[0].name.fileType() == then.data.acFileType[i].toUpperCase()) {
                        ac = true;
                    }
                }

                if (!ac) {
                    console.log('文件格式非法');
                    return;
                }

                then.fRq(res.tempFiles[0].path, res.tempFiles[0].name.fileType());
            }
        });
    },

    fRq(url, type) {

        wx.cloud.uploadFile({
            cloudPath: 'textCorr/' + md5.hex_md5(time.getTime() + app.globalData.openid) + type, // 上传至云端的路径
            filePath: url, //本地路径
            success: res => {
                // 返回文件 ID
                // console.log(res.fileID);
                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                    success: res => {
                        var src = res.fileList[0].tempFileURL;
                        // wx.request({
                        //     url: '',
                        //     data: {"url":url},
                        //     header: {'content-type':'application/json'},
                        //     method: 'GET',
                        //     dataType: 'json',
                        //     responseType: 'text',
                        //     success: (result)=>{

                        //     },
                        //     fail: ()=>{},
                        //     complete: ()=>{}
                        // });
                    },
                    fail: console.error
                });
            },
            fail: console.error
        });



    },

    fRq_1(url, type){
        wx.uploadFile({
            url:'',
            filePath:url,
            data:{"type":type},
            success(res){
                console.log(res)
            },
            fail(err){
                console.log(err)
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
})