$(()=>{
    $(".header-mid-small > p > span").click(function(){
        let _menu = $(this).parent().parent().find(".header-mid-smallMenu");
        console.log(_menu);
        if(_menu.hasClass("show")){
            console.log("toHidden");
            _menu.removeClass("show").animate({
                "top":"-200%",
                "height":"0",
            },500);
        }else{
            console.log("toShow");
            _menu.addClass("show").animate({
                "top":"100%",
                "height":"200px"
            },500);
        }
    });
});