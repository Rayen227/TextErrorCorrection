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

                console.log(res);

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

                then.fAc(res.tempFiles[0].path, res.tempFiles[0].name.fileType());
            }
        });
    },

    fAc(url, type) {

        wx.cloud.uploadFile({
            cloudPath: 'textCorr/' + md5.hex_md5(time.getTime() + app.globalData.openid) + type, // 上传至云端的路径
            filePath: url, //本地路径
            success: res => {
                // 返回文件 ID
                console.log(res.fileID);

            },
            fail: console.error
        });

        // wx.cloud.getTempFileURL({
        //     fileList: ['cloud://xxx.png'],
        //     success: res => {
        //         // fileList 是一个有如下结构的对象数组
        //         // [{
        //         //    fileID: 'cloud://xxx.png', // 文件 ID
        //         //    tempFileURL: '', // 临时文件网络链接
        //         //    maxAge: 120 * 60 * 1000, // 有效期
        //         // }]
        //         console.log(res.fileList)
        //     },
        //     fail: console.error
        // });

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