const app = getApp();


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
                history: app.globalData.histqu
            });

            console.log(app.globalData.histqu);


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
            // console.log("export:", e.currentTarget.dataset.index);
            wx.request({
                url: 'https://correct.cn1.utools.club/export',
                data: {
                    hist: app.globalData.histqu[e.currentTarget.dataset.index]
                },
                header: { 'content-type': 'application/json' },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    console.logo(result);
                },
                fail: () => { },
                complete: () => { }
            });
        }
    }
});
