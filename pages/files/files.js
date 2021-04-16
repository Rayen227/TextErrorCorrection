// pages/files/files.js
const md5 = require('../../utils/md5.js');
const window = require('../../utils/window.js');
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
        curText: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        window.loading("");

        // this.loadAni();

        // this.setRes();




    },


    ctor() {
        this.curRes = [];
        this.curText = '';
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
        var iconSrc = '';
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
                var ftype = res.tempFiles[0].name.fileType();

                for (var i = 0; i < then.data.acFileType.length; i++) {
                    if (ftype == then.data.acFileType[i] ||
                        ftype == then.data.acFileType[i].toUpperCase()) {
                        ac = true;
                    }
                }

                if (!ac) {
                    console.log('文件格式非法');
                    return;
                }

                then.rfRq(res.tempFiles[0].path, ftype);

                if (ftype == '.doc' || ftype == '.docx' || ftype == '.DOC' || ftype == '.DOCX') {
                    iconSrc = 'docicon';
                }
                else if (ftype == '.pdf' || ftype == '.PDF') {
                    iconSrc = 'pdficon';
                }
                else if (ftype == '.txt' || ftype == '.TXT') {
                    iconSrc = 'txticon';
                }

                then.setData({
                    iconSrc: 'cloud://test-h8qbc.7465-test-h8qbc-1301182329/textCorr/source/' + iconSrc + '.png'
                });

                // console.log(then.data.iconSrc);

            }
        });
    },

    input(e) {
        this.curText = e.detail.value;
    },

    submmit() {
        var then = this;
        wx.request({
            url: 'https://correct.cn1.utools.club/correct',
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

                console.log("纠错结果", res);
                then.curRes = res.data.data.result;
                then.setRes();
            },
            fail: () => {

            },
            complete: () => { }
        });
    },

    rfRq(url, type) {
        var then = this;

        window.loading("上传中");

        wx.cloud.uploadFile({
            cloudPath: 'textCorr/' + md5.hex_md5(new Date().getTime() + app.globalData.openid) + type, // 上传至云端的路径
            filePath: url, //本地路径
            success: res => {
                // 返回文件 ID
                // console.log(res.fileID);
                wx.cloud.getTempFileURL({
                    fileList: [res.fileID],
                    success: res => {
                        var src = res.fileList[0].tempFileURL;
                        wx.request({
                            url: 'https://correct.cn1.utools.club/readfile',
                            data: {
                                url: src,
                                type: 'text'
                            },
                            header: { 'content-type': 'application/json' },
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: (res) => {
                                // console.log(res);
                                // return;
                                if (res.data.code != 2000) {
                                    window.error(res.data.code);
                                    return;
                                }

                                window.success("上传成功");
                                // window.error(404);

                                console.log("文字识别结果", res);

                                // then.curRes = res.data.data.result;
                                then.curText = res.data.data.result;

                                then.fontEnd();

                                // then.setRes();

                            },
                            fail: () => {

                            },
                            complete: () => { }
                        });
                    },
                    fail: console.error
                });
            },
            fail: console.error
        });
    },

    fontEnd() {
        this.setData({
            curText: this.curText,
            btnVis: "block",
            iconVis: "inline-block"
        });
        // console.log(this.data.curText);
    },


    setRes() {
        // console.log(this.curRes);
        var rli = [];
        for (var i = 0; i < this.curRes.length; i++) {
            rli[i] = { 'text': this.curRes[i].text, 'bg': this.curRes[i].tag == 0 ? "white" : "#00B26A" }
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
        window.success("");
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
