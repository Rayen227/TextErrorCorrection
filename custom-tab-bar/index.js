Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#7A7E83",
        list: [
            {
                pagePath: "/index/index",
                iconPath: "",
                selectedIconPath: "",
                text: "首页"
            },
            {
                pagePath: "/logs/logs",
                iconPath: "/image/audio.png",
                selectedIconPath: "",
                text: "相机"
            },
            {
                pagePath: "/index/index",
                iconPath: "",
                selectedIconPath: "",
                text: "文档"
            },
            {
                pagePath: "/logs/logs",
                iconPath: "",
                selectedIconPath: "",
                text: "录音"
            },

            {
                pagePath: "/myself/myself",
                iconPath: "",
                selectedIconPath: "",
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