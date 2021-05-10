// app.js
const dbf = require('./utils/dbf.js');
const md5 = require('./utils/md5.js');
wx.cloud.init({
    env: 'test-h8qbc'
});
App({
    onLaunch() {

    },
    globalData: {
        userInfo: null,
        openid: null,
        text: '',
        histqu: [],
        selected: 0,
        isshow: 0
    }
});


String.prototype.fileType = function () {
    var i = this.lastIndexOf(".");
    return this.substring(i + 1);
};
