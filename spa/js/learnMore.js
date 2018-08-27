$(()=>{
    //加载公共头和公共尾
    $(".header").load("header.html", function(){
        $(".header-wrap").css("height", "200px")
            .find(".header-banner").css("display","none");
    });
    $(".footer").load("footer.html");

})