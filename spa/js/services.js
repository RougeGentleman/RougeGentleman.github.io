$(()=>{
    $(".header").load("header.html", function(){
        $(".header-wrap").css("height", "200px")
            .find(".header-banner").css("display","none");
        $(".header-mid-services").find(".header-mask").css({
            "height":"100%",
            "width":"100%",
        }).end().find("a").css("color","white");
    });
    $(".footer").load("footer.html");

    //设置main-banner 点击底部按钮响应事件
    $(".main-banner-bottomButtons span").click(function(){
        let _index = $(this).index();
        let _items = $(".main-banner-content li");
        _items.fadeOut(500, function(){
            _items.removeClass("main-banner-itemShow")
                .eq(_index).addClass("main-banner-itemShow").css("animation", "opacityAnimation 1.5s");
        })
        $(this).addClass("main-banner-bottomButtonSelected")
            .siblings().removeClass("main-banner-bottomButtonSelected").css("transition", "all 300ms");
    });
})