module.exports = {
    //主题设置
    theme: 'reco',
    title: 'kwi的博客',
    description: 'This is no time for cautious',
   
    head: [
         // 解决语雀图片防盗链问题
        [
            "meta",
            { name: "referrer", content: "no-referrer" },
        ],
        // 设置 favicon.ico
        [
            'link', 
            { rel: 'icon', href: '/images/kwiImg.jpg' }
        ]

    ],
    //导航设置
    themeConfig: {
        subSidebar: 'auto',
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '目录' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/KwiZhou' },
                { icon: 'reco-other', link: 'https://www.yuque.com/dizibuyuanlaitalinjianfangzi' }
            ]
        },
        type: 'blog',
        logo: '/images/kwiImg.jpg',
        authorAvatar: '/images/kwiImg.jpg',
        nav: require('./nav'),
        //侧边栏
        sidebar: require('./sidebar'),
        // 备案
        record: '浙ICP备2022003568号',
        recordLink: 'https://beian.miit.gov.cn/#/Integrated/index',
        //cyberSecurityRecord: '公安部备案文案',
        //cyberSecurityLink: '公安部备案指向链接',
        // 项目开始时间，只填写年份
        startYear: '2022',
        // 全局作者名字
        author: 'kwi',
        mode: 'light', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
        modePicker: false // 默认 true，false 不显示模式调节按钮，true 则显示
    },
    //插件相关
    //plugins: ['@vuepress/pwa', {
    // serviceWorker: true,
    //updatePopup: true
    //}],



}