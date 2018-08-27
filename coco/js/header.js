$(() => {
    //header对象
    let headerWrap = $(".header-wrap");
    let headerWrapFixed = $(".header-wrap-fixed");
    //window对象
    let _window = $(window);

    //设置悬浮显示更多的动画效果
    $(".header-item-more").hover(function () {
        $(this).find("ul").stop().slideDown(300).addClass("show-animate").end().find(".header-item").css({
            "display": "inline-block",
            "transition": "all 300ms",
            "transform": "rotate(90deg)"
        });
        //设置小三角出现效果
        $(this).find(".item-more-triangular")
            .css("display", "inline-block")
            .stop().animate({
                "right": "20px"
            }, 400);
    }, function () {
        $(this).find("ul").stop().slideUp(300).end().find(".header-item").css({
            "display": "inline-block",
            "transition": "all 300ms",
            "transform": "rotate(0deg)"
        });
        $(this).find(".item-more-triangular").stop().animate({
            "right": "0px",
        }, 300, function () { $(this).css("display", "none") });
    });

    //设置滑动固定定位效果
    //1.检测滚动高度是否达到header的高度, 是则切换另一种布局
    $(_window).scroll(function () {
        if (_window.scrollTop() > headerWrap.height()) {
            headerWrap.css("display", "none");
            headerWrap.parent().addClass("header-fixed");
            headerWrapFixed.css("display", "block");

        } else {
            headerWrap.css("display", "block");
            headerWrap.parent().removeClass("header-fixed");
            headerWrapFixed.css("display", "none");
        }
    });

    //TODO: 设置各种点击跳转
    $(".header-about").click(()=>{
        window.location.href = "about.html#0";
    })
    $(".header-about ul li").click(function(ev){
        //TODO: 需要注意, li为两个布局的数量
        let _index = $(this).index();
        switch (_index){
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
        //取消事件冒泡
        ev.stopPropagation();
    });

    $(".header-product").click(()=>{
        window.location.href = "product_person.html";
    });
    $(".header-product ul li").click(function(ev){
        let _index = $(this).index();
        switch(_index){
            case 0:
                window.location.href = "product_person.html";
                break;
            case 1:
                window.location.href = "product_ai.html";
                break;
            case 2:
                window.location.href = "product_order.html";
                break;
            default:
                break;
        }
        //取消事件冒泡
        ev.stopPropagation();
    });
    
    $(".header-help").click(()=>{
        window.location.href = "help_list.html?type=0&page=1";
    });
    $(".header-help ul li").click(function(ev){
        let _index = $(this).index();
        console.log(_index);
        switch(_index){
            case 0:
                window.location.href = "help_problem.html";
                break;
            case 1:
                window.location.href = "help_list.html?type=1&page=1";
                break;
            default:
                break;
        }
        //取消事件冒泡
        ev.stopPropagation();
    });
});
