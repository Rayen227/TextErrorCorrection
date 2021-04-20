// index.js
// 获取应用实例
const app = getApp();
const window = require('../../utils/window.js');
const md5 = require('../../utils/md5.js');
Page({
    data: {

    },
    onLoad() {
        // console.log(app);
        this.ctor();
    },

    ctor() {
        this.docf = ['doc', 'docx', 'pdf', 'txt'];
        this.imgf = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif'];
        this.aduf = ['mp3', 'm4a', 'wav'];
        this.RQTYPE = ['text', 'image_write', 'image_print', 'audio'];
    },

    upload(acFileType, rqType, callback) {
        var then = this;
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            success(res) {

                var ac = false;
                var ftype = res.tempFiles[0].name.fileType();
                for (var i = 0; i < acFileType.length; i++) {
                    if (ftype == acFileType[i].toLowerCase() || ftype == acFileType[i].toUpperCase()) {
                        ac = true;
                        break;
                    }
                }

                if (!ac) {
                    window.prompt("文件格式非法");
                    return;
                }

                if (res.tempFiles[0].size >= 1024 * 1024 * 10) {
                    window.prompt("文件大小不能超过10Mb");
                    return;
                }

                then.rfRq(res.tempFiles[0].path, rqType, ftype, callback);

            }
        });
    },


    rfRq(url, rqType, type, callback) {
        var then = this;

        window.loading("上传中");

        wx.cloud.uploadFile({
            cloudPath: 'textCorr/' + md5.hex_md5(new Date().getTime() + app.globalData.openid) + '.' + type, // 上传至云端的路径
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
                                type: rqType
                            },
                            header: { 'content-type': 'application/json' },
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: (res) => {

                                if (res.data.code != 2000) {
                                    window.error(res.data.code);
                                    return;
                                }

                                window.success("上传成功");
                                // window.error(404);

                                console.log("文字识别结果", res);

                                app.globalData.text = res.data.data.result;

                                callback({ ext: type });


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


    doc() {
        this.upload(this.docf, 'text', function (e) {
            if (!e) {
                return;
            }
            wx.navigateTo({
                url: '../files/files?type=document&ext=' + e.ext
            });
        });

    },

    adu() {
        this.upload(this.aduf, 'audio', function (e) {
            if (!e) {
                return;
            }
            wx.navigateTo({
                url: '../files/files?type=aduio&ext=' + e.ext
            });
        });
    },

    img() {

        this.upload(this.imgf, 'image_write', function (e) {
            if (!e) {
                return;
            }
            wx.navigateTo({
                url: '../files/files?type=image&ext=' + e.ext
            });
        });
    },

    text() {
        app.globalData.text = '';
        wx.navigateTo({
            url: '../files/files?type=text&ext=none'
        });
    }

})
