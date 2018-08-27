$(()=>{
    $(".header").load("header.html",function(){
       $(".header-wrap").css("height", "130px")
            .find(".header-banner").css("display","none");
        $(".header-mid-about").find(".header-mask").css({
            "height":"100%",
            "width":"100%",
        }).end().find("a").css("color","white");

    });
    $(".footer").load("footer.html");
});