const app = getApp();
const window = require('../../utils/window.js');

Component({
    data: {
        history: []
    },
    pageLifetimes: {
        show() {

            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 2,
                    isshow: true
                })
            }

            this.setData({
                history: app.globalData.histqu,
            });


        }
    },
    methods: {
        test() {
            console.log("test");
        },
        /**
         * 导出纠错历史为文档形格式
         */
        export(e) {
            window.loading("解析中");
            wx.request({
                url: 'https://correct.cn1.utools.club/export',
                data: {
                    hist: app.globalData.histqu[e.currentTarget.dataset.index]
                },
                header: { 'content-type': 'application/json' },
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    console.log(result);
                    if (result.statusCode != 200) {
                        window.error(result.statusCode);
                        return;
                    }
                    wx.setClipboardData({
                        data: result.data.data.result,
                        success() {
                            window.noloading();
                            window.hideToust();
                            window.prompt('链接已复制，在浏览器中粘贴搜索即可下载！');
                            // wx.getClipboardData({
                            //     success(res) {
                            //         console.log(res.data) // data
                            //     }
                            // })
                        }
                    })
                },
                fail: console.error,
                complete: () => { }
            });
        }
    }
});
