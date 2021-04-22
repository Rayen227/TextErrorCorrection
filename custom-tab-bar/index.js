Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#7A7E83",
        list: [
            {
                pagePath: "/index/index",
                iconPath: "/image/tab_index_sel.png",
                selectedIconPath: "/image/tab_index.png",
                text: "首页"
            },
            {
                pagePath: "/logs/logs",
                iconPath: "/image/tab_camera.png",
                selectedIconPath: "/image/tab_camera.png",
                text: ""
            },
            {
                pagePath: "/index/index",
                iconPath: "/image/tab_history_sel.png",
                selectedIconPath: "/image/tab_history.png",
                text: "文档"
            },
            {
                pagePath: "/logs/logs",
                iconPath: "/image/tab_audio.png",
                selectedIconPath: "/image/tab_audio.png",
                text: ""
            },

            {
                pagePath: "/myself/myself",
                iconPath: "/image/tab_myself_sel.png",
                selectedIconPath: "/image/tab_myself.png",
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