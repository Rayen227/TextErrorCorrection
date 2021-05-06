//index.js
//获取应用实例

Component({
    data: {
        hasUserInfo: true,
        userInfo: {}
    },
    pageLifetimes: {
        show() {

            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 4
                })
            }
        }
    },
    methods: {
        test() {
            console.log("test");
        }
    }
});
