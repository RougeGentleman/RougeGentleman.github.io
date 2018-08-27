$(()=>{
    //设置点击显示offer弹窗
    $(".job-offerButton").click(ev=>{
        $("body").css({
            "overflow":"hidden",
            "height":"100%",
            "width":"99vw"
        });
        $(".about-joinUs-mask").css("display","block")
            .find(".about-joinUs-maskContainer").css("display", "flex").removeClass("elementSlideOutUp").addClass("elementSlideInDown");
    });

    //设置点击事件: 点击内容之外区域隐藏遮罩层
    $(".about-joinUs-mask").click(function(ev){
        if(ev.target.className === this.className){
            //点击内容之外的区域, 进行隐藏
            toHideMask();
        }
    });

    //设置点击事件: 点击 X 区域隐藏遮罩层
    $(".offer-closeButton").click(()=>{
        toHideMask();
    });
    //设置点击事件: 点击 取消按钮 隐藏遮罩层
    $(".offer-cancelButton").click(()=>{
        toHideMask();
    });

    //方法: 隐藏遮罩层
    function toHideMask(){
        $(".about-joinUs-maskContainer")
            .removeClass("elementSlideInDown")
            .fadeOut(400, function(){
                $(this).parent().css("display", "none");
                //还原body属性
                $("body").attr("style", "");
            })
            .addClass("elementSlideOutUp");
    }

});