// index.js
// 获取应用实例
const app = getApp();
const request = require('../../utils/request.js');

Component({
    data: {

    },
    pageLifetimes: {
        show() {
            // this.ctor();
            this.docf = ['doc', 'docx', 'pdf', 'txt'];
            this.imgf = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif'];
            this.aduf = ['mp3', 'm4a', 'wav'];
            this.RQTYPE = ['text', 'image_write', 'image_print', 'audio'];


            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 0
                })
            }

        }
    },
    methods: {

        doc() {
            request.upload(this.docf, function (e) {
                if (!e) {
                    return;
                }
                request.readFile(e.tempFilePath, 'audio', e.ext, function () {
                    wx.navigateTo({
                        url: '../files/files?type=document&ext=' + e.ext
                    });
                });
            });

        },

        adu() {

            request.upload(this.aduf, function (e) {
                if (!e) {
                    return;
                }

                request.readFile(e.tempFilePath, 'audio', e.ext, function () {
                    wx.navigateTo({
                        url: '../files/files?type=aduio&ext=' + e.ext
                    });
                });

            });
        },

        img() {
            var then = this;

            wx.showActionSheet({
                itemList: ['手写体', '印刷体'],
                itemColor: '#000000',
                success: (result) => {
                    wx.chooseImage({
                        count: 1,
                        sourceType: ['album'],
                        success: function (res) {

                            request.readFile(res.tempFilePaths[0], then.RQTYPE[result.tapIndex + 1],
                                res.tempFilePaths[0].fileType(), function () {

                                    wx.navigateTo({
                                        url: '../files/files?type=image&ext=' + res.tempFilePaths[0].fileType()
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
        },

    }
});