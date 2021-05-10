//index.js
//获取应用实例
const app = getApp();
const window = require('../../utils/window.js');
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
                    selected: 4,
                    isshow: true
                });
            }

            this.setData({
                userInfo: app.globalData.userInfo
            });
        }
    },
    methods: {
        test() {
            console.log("test");
        }
    }
});
