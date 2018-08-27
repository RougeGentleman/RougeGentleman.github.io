$(() => {
    //当前子页面的索引
    let pageIndex = -1;

    //导入头部和尾部
    $(".header").load("header.html", () => {
        //加载完成后设置选中效果
        $(".header-about").addClass("header-nav-selected");
    });
    $(".footer").load("footer.html");

    //TODO 页面加载后, 默认执行
    //默认检测 URL 中 Hash ,判断加载那个子页面
    checkHash();
    //设置 header 中的选中


    //设置事件监听: 监听 Hashchange 事件
    $(window).bind("hashchange", () => {
        checkHash();
    });

    //设置点击事件: 点击切换显示页面
    $(".content-menu li").click(function () {
        let _index = $(this).index();
        switch (_index) {
            case 0:
                window.location.href = "about.html#0";
                break;
            case 1:
                window.location.href = "about.html#1";
                break;
            case 2:
                window.location.href = "about.html#2";
                break;
            default:
                break;
        }
    });

    /**
     * 方法: 设置点击切换显示页面的动画效果
     * @param container 用于放置页面的容器
     * @param url 需要显示的网页URL地址
     * @param targetElement 需要设置动画的元素(一般为子容器)
     */
    function setSwitchAnimation(container, url, targetElement) {
        container.addClass("elementRotateOutY");
        setTimeout(() => {
            container.load(url, function () {
                $(this).removeClass("elementRotateOutY").find(targetElement).addClass("elementRotateInY");
            });
        }, 700);
    }

    //方法: 当点击切换页面后的效果
    function setSwitchStyle(index) {
        $(".content-menu li").eq(index).addClass("content-menu-selected")
            .siblings().removeClass("content-menu-selected");
    }

    //方法: 综合, 切换页面
    function switchPage(index) {
        //判断是否需要进行切换
        if (index === pageIndex) {
            return;
        }
        let _container = $(".content-container");
        switch (index) {
            case 0:
                setSwitchAnimation(_container, "about_company.html", ".company-container");
                break;
            case 1:
                setSwitchAnimation(_container, "about_concatUs.html", ".concatUs-container");
                break;
            case 2:
                setSwitchAnimation(_container, "about_joinUs.html", ".about-joinUs-item");
                break;
        }
        //设置子页面索引
        pageIndex = index;
        //设置点击后的显示效果
        $(".content-menu li").eq(index).addClass("content-menu-selected")
            .siblings().removeClass("content-menu-selected");

        function setSwitchAnimation(container, url, targetElement) {
            container.addClass("elementRotateOutY");
            setTimeout(() => {
                container.load(url, function () {
                    $(this).removeClass("elementRotateOutY").find(targetElement).addClass("elementRotateInY");
                });
            }, 700);
        }
    }

    //方法: 用于检测URL中的Hash并进行跳转
    function checkHash() {
        let _hash = window.location.hash;
        if (_hash && _hash.length > 0 && _hash.indexOf("#") === 0) {
            let _pageIndex = _hash.charAt(1);
            _pageIndex = parseInt(_pageIndex);
            if (typeof _pageIndex !== "number") {
                return;
            }
            switch (_pageIndex) {
                case 0:
                    switchPage(0);
                    break;
                case 1:
                    switchPage(1);
                    break;
                case 2:
                    switchPage(2);
                    break;
                default:
                    switchPage(0);
                    break;
            }
        } else {
            switchPage(0);
        }
    }
});