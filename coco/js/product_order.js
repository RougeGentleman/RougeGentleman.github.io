$(()=>{
    //设置一屏高度
    $("body > div").css({
        "height":$(window).height()+"px",
        "width":$(window).width()+"px"
    });
})