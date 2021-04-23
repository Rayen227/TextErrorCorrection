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
                pagePath: "/logs/logs",
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
                pagePath: "/logs/logs",
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
            const data = e.currentTarget.dataset
            const url = data.path
            const index = e.currentTarget.dataset.index;
            console.log(index);
            // wx.switchTab({ url })
            // this.setData({
            //     selected: data.index
            // })
        }
    }
})