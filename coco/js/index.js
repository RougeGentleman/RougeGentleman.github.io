$(()=>{
    //导入头部和底部
    $(".header").load("header.html", null, ()=>{
        //加载完成, 设置选中效果
        $(".header-index").addClass("header-nav-selected");
    });
    $(".footer").load("footer.html");

    //轮播
    //图片轮播索引
    let picIndex = 0;
    //轮播图片的容器
    let picContainer = $(".nav-imgContainer");
    //单个图片的宽度
    let picWidth = picContainer.find("img").width();
    //容器中图片的数量
    let picCount = $(".nav-imgContainer > div").length;
    //图片自动轮播定时器
    let picTimer;

    //index页面中介绍部分元素
    let intro1 = $(".intro1");
    let intro2 = $(".intro2");
    let intro3 = $(".intro3");
    let intro4 = $(".intro4");
    let intro5 = $(".intro5");
    let company = $(".company");

    //开始自动轮播
    startAutoPlay();

    //轮播: 设置中间按钮点击事件
    $(".nav-midButtons span").click(function(){
        let _index = $(this).index();
        console.log("index:"+_index);
        if(_index === 0){
            //清除定时器
            clearInterval(picTimer);
            picToRight();
            //开始自动播放
            startAutoPlay();
        }else if(_index === 1){
            //清除定时器
            clearInterval(picTimer);
            picToLeft();
            //开始自动播放
            startAutoPlay();
        }
    });
    //轮播: 底部按钮点击事件
    $(".nav-bottomButtons span").click(function(){
        let _index = $(this).index();
        //清除定时器
        clearInterval(picTimer);
        //移动图片容器
        picContainer.animate({
            left: "-"+_index*picWidth
        },500);
        //设置当前播放的索引并开始轮播
        picIndex = _index;
        startAutoPlay();
        //设置当前底部按钮样式
        setBottomButtonStyle();
    });
    //轮播方法: 右移图片
    function picToLeft(){
        //进行移动, 移动完成后改变index数值
        picIndex++;
        if(picIndex > picCount-1){
            picIndex=1;
            //图片容器位置重置
            picContainer.css("left", "0px");
        }
        picContainer.stop().animate({
            left: -picWidth*picIndex+"",
        }, 500);

        //设置底部按钮样式
        if(picIndex === picCount-1){
            setBottomButtonStyle(true);
        }else{
            setBottomButtonStyle();
        }
    }
    //轮播方法: 左移图片
    function picToRight(){
        //进行移动, 移动完成后改变index数值
        picIndex--;
        if(picIndex < 0){
            picIndex= picCount-2;
            //图片容器位置重置
            picContainer.css("left", "-"+(picCount-1)*picWidth+"px");
        }
        picContainer.stop().animate({
            left: -picWidth*picIndex+"",
        }, 500);

        //设置底部按钮样式
        if(picIndex === picCount-1){
            setBottomButtonStyle(true);
        }else{
            setBottomButtonStyle();
        }
    }
    //轮播方法: 用于改变底部按钮样式
    function setBottomButtonStyle(isReset){
        //当index存在则执行为index所在设置样式, 否则设置全局变量的index
        if(isReset){
            $(".nav-bottomButtons span")
                .eq(0)
                .addClass("nav-bottomButton-selected")
                .siblings()
                .removeClass("nav-bottomButton-selected");
        }else{
            $(".nav-bottomButtons span")
                .eq(picIndex)
                .addClass("nav-bottomButton-selected")
                .siblings()
                .removeClass("nav-bottomButton-selected");
        }
    }
    //轮播方法: 设置自动轮播
    function startAutoPlay(){
        picTimer = setInterval(()=>{
            picToLeft();
        }, 5000);
    }

    //设置滚动事件,增加index页面元素的动画
    $(document).on("scroll", function() {
        let _visible = $(window).scrollTop() + $(window).height()-80;

        //判断是否需要显示返回顶部按钮
        if(_visible >= $(window).height()){
            //显示
            $(".fixed-scrollTop").css({
                "opacity":"1",
                "display":"block",
                "animation":"fadeInUp 1s"
            });
        }else{
            $(".fixed-scrollTop").css({
                "transition":"all 300ms",
                "opacity":"0",
                "display":"none"
            });
        }

        //intro1动画效果
        if ((_visible >= intro1.offset().top) && (_visible <= intro1.offset().top + intro1.height())) {
            intro1.find(".intro1-title").addClass("elementFadeInDown")
                .end().find(".intro1-subTitle").addClass("elementFadeInDown");
        } else if (_visible >= intro2.offset().top && (_visible <= intro2.offset().top + intro2.height())) {
            intro2.find(".intro2-left").addClass("elementFadeInLeft")
                .end().find(".intro2-right").addClass("elementFadeInRight");
        } else if (_visible >= intro3.offset().top && (_visible <= intro3.offset().top + intro3.height())) {
            intro3.find(".intro3-left").addClass("elementFadeInLeft")
                .end().find(".intro3-right").addClass("elementFadeInRight");
        } else if (_visible >= intro4.offset().top && (_visible <= intro4.offset().top + intro4.height())) {
            intro4.find(".intro4-left").addClass("elementFadeInLeft")
                .end().find(".intro4-right").addClass("elementFadeInRight");
        } else if (_visible >= intro5.offset().top && (_visible <= intro5.offset().top + intro5.height())) {
            intro5.find(".intro5-left").addClass("elementFadeInLeft")
                .end().find(".intro5-right").addClass("elementFadeInRight");
        } else if (_visible >= company.offset().top && (_visible <= company.offset().top + company.height())){
            company.find(".company-title").addClass("elementFadeInDown")
                .end().find(".company-des").addClass("elementFadeInDown")
                .end().find(".company-example").addClass("elementFadeInUp");
        }
    });

    //设置小火箭点击事件
    $(".fixed-scrollTop img").click(function(){
        console.log("fixed");
        $("html").animate({
            "scrollTop":"0"
        },1000);
    })

});