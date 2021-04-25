// pages/history/history.js
// Page({

//     /**
//      * 页面的初始数据
//      */
//     data: {
//         history: [
//             { 'type': 'audio', 'title': '宣讲.mp4', 'time': '2021/4/22 19:13' },
//             { 'type': 'doc', 'title': '请假条.docx', 'time': '2021/4/22 13:02' },
//             { 'type': 'image', 'title': '故事的开头.jpg', 'time': '2021/4/19 15:55' },
//         ]
//     },

//     /**
//      * 生命周期函数--监听页面加载
//      */
//     onLoad: function (options) {

//     },

//     /**
//      * 生命周期函数--监听页面初次渲染完成
//      */
//     onReady: function () {

//     },

//     /**
//      * 生命周期函数--监听页面显示
//      */
//     onShow: function () {

//     },

//     /**
//      * 生命周期函数--监听页面隐藏
//      */
//     onHide: function () {

//     },

//     /**
//      * 生命周期函数--监听页面卸载
//      */
//     onUnload: function () {

//     },

//     /**
//      * 页面相关事件处理函数--监听用户下拉动作
//      */
//     onPullDownRefresh: function () {

//     },

//     /**
//      * 页面上拉触底事件的处理函数
//      */
//     onReachBottom: function () {

//     },

//     /**
//      * 用户点击右上角分享
//      */
//     onShareAppMessage: function () {

//     }
// });

Component({
    data: {
        history: [
            { 'type': 'audio', 'title': '宣讲.mp4', 'time': '2021/4/22 19:13' },
            { 'type': 'doc', 'title': '请假条.docx', 'time': '2021/4/22 13:02' },
            { 'type': 'image', 'title': '故事的开头.jpg', 'time': '2021/4/19 15:55' },
        ]
    },
    pageLifetimes: {
        show() {
            // console.log("show");
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 2
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
