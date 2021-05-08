const md5 = require('../utils/md5');
wx.cloud.init({
    env: 'test-h8qbc'
});
const db = wx.cloud.database();

function isLogin(openid) {

}


function updateHis(openid, histqu, callback) {
    db.collection("Users").where({
        _openid: openid
    }).update({
        data: {
            histqu: histqu
        },
        success: res => {
            console.log(res);
            callback(res);
        },
        fail: console.error
    });
}



module.exports = {
    isLogin, updateHis
}