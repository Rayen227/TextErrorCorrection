Component({
    data: {
        history: [
            { 'title': '宣讲.mp4', 'time': '2021/4/22 19:13' },
            { 'title': '请假条.docx', 'time': '2021/4/22 13:02' },
            { 'title': '故事的开头.jpg', 'time': '2021/4/19 15:55' },
        ]
    },
    pageLifetimes: {
        show() {

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
