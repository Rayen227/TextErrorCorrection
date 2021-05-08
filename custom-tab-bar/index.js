const window = require('../utils/window.js');
const request = require('../utils/request.js');
const app = getApp();


Component({
    data: {
        isshow:false,
        selected: null,
        color: "#7A7E83",
        selectedColor: "#7A7E83",
        list: [
            {
                pagePath: "/pages/index/index",
                iconPath: "/image/tab/index.png",
                selectedIconPath: "/image/tab/_index.png",
                text: "首页",
                color: "#7A7E83",
                selectedColor: "#0ABC3B"
            },
            {
                pagePath: "",
                iconPath: "/image/tab/camera.png",
                selectedIconPath: "/image/tab/camera.png",
                text: "",
                color: "#7A7E83",
                selectedColor: "#0ABC3B"
            },
            {
                pagePath: "/pages/history/history",
                iconPath: "/image/tab/history.png",
                selectedIconPath: "/image/tab/_history.png",
                text: "文档",
                color: "#7A7E83",
                selectedColor: "#0ABC3B"
            },
            {
                pagePath: "",
                iconPath: "/image/tab/audio.png",
                selectedIconPath: "/image/tab/audio.png",
                text: "",
                color: "#7A7E83",
                selectedColor: "#0ABC3B"
            },

            {
                pagePath: "/pages/myself/myself",
                iconPath: "/image/tab/myself.png",
                selectedIconPath: "/image/tab/_myself.png",
                text: "我的",
                color: "#7A7E83",
                selectedColor: "#0ABC3B"
            }

        ]
    },
    attached() {
    },

    methods: {

        switchTab(e) {
            // console.log(this.getTabBar().data);
            const data = e.currentTarget.dataset;
            const url = data.path;
            const index = e.currentTarget.dataset.index;
            if (index == 1) {
                cam();
            }
            else if (index == 3) {
                wx.navigateTo({
                    url: '/pages/record/record'
                });
            }
            else {
                // this.setData({
                //     selected: index
                // });
                wx.switchTab({ url });
                this.setData({
                    selected: index
                });
            }

        },
        test() {
            console.log("bind:change");
        }
    }
});


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

                    request.readFile(res.tempFilePaths[0], RQTYPE[result.tapIndex],
                        res.tempFilePaths[0].fileType(), function () {
                            wx.navigateTo({
                                url: '/pages/files/files?type=image&ext=' + res.tempFilePaths[0].fileType()
                            });
                        });

                }
            });


        },
        fail: () => { },
        complete: () => { }
    });

}