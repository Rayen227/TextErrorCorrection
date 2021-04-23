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

    /**
    * @function 上传文件
    * @description 上传文件到云存储，成功后在回调函数中调用文件识别函数rfRq
    * @param acFileType Array<String> 可接受的文件类型，内容是拓展名
    * @param rqType String 发送请求的类型/路由，内容应该是 ['text', 'image_write', 'image_print', 'audio']中之一
    * @param callback function completed类型的回调函数
    * @return void
    * @author wzq 2021/04/21 
    * @example
    */
    upload(acFileType, rqType, callback) {
        var then = this;
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: acFileType,
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

    /**
    * @function 文件识别
    * @description 请求文件识别接口
    * @param url String 本地文件的路径
    * @param rqType String 发送请求的类型/路由，内容应该是 ['text', 'image_write', 'image_print', 'audio']中之一
    * @param type String 本次上传文件的拓展名
    * @param callback function completed类型的回调函数
    * @return void
    * @author wzq 2021/04/21 
    * @example
    */
    rfRq(url, rqType, type, callback) {
        var then = this;

        window.loading("识别中");

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

                                if (res.statusCode == 404) {
                                    window.noloading();
                                    window.prompt("维护中");
                                    return;
                                }

                                if (res.statusCode >= 300) {
                                    window.noloading();
                                    window.prompt("网络错误");
                                    return;
                                }
                                if (res.data.code != 2000) {
                                    window.error(res.data.code);
                                    // window.prompt("网络不可用");
                                    return;
                                }

                                window.success("识别成功");
                                // window.error(404);

                                console.log("文字识别结果", res);

                                app.globalData.text = res.data.data.result;

                                callback({ ext: type });


                            },
                            fail: () => {
                                window.error("网络错误");
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
        var then = this;

        wx.showActionSheet({
            itemList: ['手写体', '印刷体'],
            itemColor: '#000000',
            success: (result) => {
                // console.log(result);
                // then.upload(then.imgf, then.RQTYPE[result.tapIndex + 1], function (e) {
                //     if (!e) {
                //         return;
                //     }
                //     wx.navigateTo({
                //         url: '../files/files?type=image&ext=' + e.ext
                //     });
                // });
                wx.chooseImage({
                    count: 1,
                    sourceType: ['album'],
                    success: function (res) {
                        console.log(res);
                        then.rfRq(res.tempFilePaths[0], then.RQTYPE[result.tapIndex + 1],
                            res.tempFilePaths[0].fileType(), function (e) {
                                if (!e) {
                                    return;
                                }
                                wx.navigateTo({
                                    url: '../files/files?type=image&ext=' + e.ext
                                });
                            });

                    }
                });


            },
            fail: () => { },
            complete: () => { }
        });

    },

    text() {

        app.globalData.text = '';
        wx.navigateTo({
            url: '../files/files?type=text&ext=none'
        });
    }

})
