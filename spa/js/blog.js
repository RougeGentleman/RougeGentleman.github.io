$(()=>{
     //加载公共头和公共尾
    $(".header").load("header.html", function(){
        $(".header-wrap").css("height", "200px")
            .find(".header-banner").css("display","none");
        $(".header-mid-blog").find(".header-mask").css({
            "height":"100%",
            "width":"100%"
        }).end().find("a").css("color","white");
    });
    $(".footer").load("footer.html");

})