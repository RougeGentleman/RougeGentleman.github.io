$(()=>{
    pre();

    //准备函数
    function pre(){
        //加载公共头部和尾部
        $(".header").load("header.html", function(){
            //设置选中效果
        });
        $(".footer").load("footer.html");

        setEvents();
    }
    //事件设置函数
    function setEvents(){
        //设置按钮点击效果
        $(".help-questions i").click(function(){
            let _parent = $(this).parent().parent();
            //当前已显示内容, 点击时隐藏内容
            if($(this).hasClass("icon-help-substract")){
                //设置点击动画
                $(this).removeClass("icon-help-substract")
                    .addClass("icon-help-add")
                    .css({
                        "transform":"rotate(180deg)",
                        "color":"#ddd"
                    });
                //设置隐藏
                _parent.find(".help-questionContainer").slideUp(300);
            }else if($(this).hasClass("icon-help-add")){
                $(this).removeClass("icon-help-add")
                    .addClass("icon-help-substract")
                    .css({
                        "color":"#000",
                        "transform":"rotate(0)"
                    });
                _parent.find(".help-questionContainer").slideDown(300);
            }
        });
    }
});