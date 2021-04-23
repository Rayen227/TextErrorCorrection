const indf = require('../pages/index/index.js');
const window = require('../utils/window.js');
Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#7A7E83",
        list: [
            {
                pagePath: "/index/index",
                iconPath: "/image/tab/index.png",
                selectedIconPath: "/image/tab/_index.png",
                text: "首页"
            },
            {
                pagePath: "",
                iconPath: "/image/tab/camera.png",
                selectedIconPath: "/image/tab/camera.png",
                text: ""
            },
            {
                pagePath: "/index/index",
                iconPath: "/image/tab/history.png",
                selectedIconPath: "/image/tab/_history.png",
                text: "文档"
            },
            {
                pagePath: "",
                iconPath: "/image/tab/audio.png",
                selectedIconPath: "/image/tab/audio.png",
                text: ""
            },

            {
                pagePath: "/myself/myself",
                iconPath: "/image/tab/myself.png",
                selectedIconPath: "/image/tab/_myself.png",
                text: "我的"
            }

        ]
    },
    attached() {
    },

    methods: {
        switchTab(e) {
            console.log(this);
            const data = e.currentTarget.dataset
            const url = data.path
            const index = e.currentTarget.dataset.index;
            console.log(index);
            if (index == 1) {
                cam();
                return;
            }
            if (index == 3) {
                return;
            }
            wx.switchTab({ url });
            this.setData({
                selected: data.index
            });
        }
    }
});



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
function rfRq(url, rqType, type, callback) {

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
}
function cam() {
    var RQTYPE = ['image_write', 'image_print']
    wx.showActionSheet({
        itemList: ['手写体', '印刷体'],
        itemColor: '#000000',
        success: (result) => {
            wx.chooseImage({
                count: 1,
                sourceType: ['camera'],
                success: function (res) {
                    // console.log(res);
                    rfRq(res.tempFilePaths[0], RQTYPE[result.tapIndex],
                        res.tempFilePaths[0].fileType(), function (e) {
                            if (!e) {
                                return;
                            }
                            wx.navigateTo({
                                url: '../pages/files/files?type=image&ext=' + e.ext
                            });
                        });

                }
            });


        },
        fail: () => { },
        complete: () => { }
    });

}