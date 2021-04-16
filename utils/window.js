function success(tip) {
    wx.showToast({
        title: tip,
        icon: 'success',
        duration: 1000
    });
}

function loading(tip) {
    wx.showLoading({
        title: tip,
        mask: true
    });
}

function error(code) {
    wx.showToast({
        title: "error:" + code,
        icon: 'error',
        duration: 1000
    });
}

module.exports = {
    success, loading, error
}