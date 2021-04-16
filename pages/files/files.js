// pages/files/files.js
const md5 = require('../../utils/md5.js');
const app = getApp();
const time = new Date();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        acFileType: ['.docx', '.pdf', '.txt', '.doc'],
        scale: {},
        resli: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {



        this.loadAni();

        // this.setRes();




    },


    ctor() {
        this.curRes = [];
    },


    loadAni() {
        // 创建动画实例(animation)
        var animation = wx.createAnimation({
            duration: 2000,//动画持续时间
            timingFunction: 'linear',
            //具体配置项请查看文档
        })

        // 建立标识(用于循环)
        this.animation = animation
        var next = true;

        // 无限循环动画
        setInterval(function () {

            if (next) {
                // 你要执行动画链(详见文档)
                this.animation.scale(1.5).step()
                // ----------------------- 
                next = !next;
            }

            else {
                // 你要执行动画链(详见文档)
                this.animation.scale(1).step()
                // -----------------------
                next = !next;
            }

            // 导出动画
            this.setData({
                scale: animation.export()
            })

        }.bind(this), 2000);
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
        var then = this;

        var fname = time.getTime() + app.globalData.openid;
        console.log(new Date().getTime());
        wx.cloud.uploadFile({
            cloudPath: 'textCorr/' + md5.hex_md5(fname) + type, // 上传至云端的路径
            filePath: url, //本地路径
            success: res => {
                // 返回文件 ID
                // console.log(res.fileID);
                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                    success: res => {
                        var src = res.fileList[0].tempFileURL;
                        wx.request({
                            url: 'https://correct.cn1.utools.club/file',
                            data: {
                                url:src
                            },
                            header: { 'content-type': 'application/json' },
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: (res) => {
                                // console.log("fRq:", res);
                                then.curRes = res.data.data.result;
                                then.setRes();

                            },
                            fail: () => { },
                            complete: () => { }
                        });
                    },
                    fail: console.error
                });
            },
            fail: console.error
        });



    },

    setRes() {
        // console.log(this.curRes);
        var rli = [];
        for (var i = 0; i < this.curRes.length; i++) {
            rli[i] = { 'text': this.curRes[i].text, 'bg': this.curRes[i].tag == 0 ? "white" : "aqua" }
        }

        // console.log(rli);

        this.setData({
            resli: rli
        });

    },

    // gtRText() {
    //     return "<text color=red>真的吗</text>";
    // },



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
