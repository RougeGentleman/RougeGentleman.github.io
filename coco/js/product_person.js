$(() => {

    pre();

    //方法: 准备函数
    function pre() {
        //加载公共头部与公共尾部
        $(".header").load("header.html", function () {
            $(".header-product").addClass("header-nav-selected");
            //默认显示第二个布局
            $(".header-wrap").css("display", "none")
                .parent().addClass("header-fixed")
                .find(".header-wrap-fixed").css("display", "block");
        });
        // $(".footer").load("footer.html");
        //加载音乐插件
        $(".music").load("music.html");

        setStartMask();

        initSwiper();
    }

    //方法: 开机动画设置
    function setStartMask() {
        console.log("aa");
        //设置开
        $(".start-mask").on("scroll", function (ev) {
            console.log(ev);
        });

        $(".start-mask").on("dblclick", function (ev) {
            $(this).animate({
                    "top": "-100vh"
                },
                500,
                function () {
                    $(this).css("display", "none");
                    $(".swiper-container").css("display", "block");
                });
        });

        //设置自动推出定时器
        setTimeout(function(){
            $(".start-mask").animate({
                    "top": "-100vh"
                },
                500,
                function () {
                    $(this).css("display", "none");
                    $(".swiper-container").css("display", "block");
                });
        }, 3000);
    }

    //方法: 初始化swiper插件
    function initSwiper() {
        let _swiper = new Swiper(".swiper-container", {
            direction: "vertical",
            mousewheel: true,
            speed: 500,
            grabCursor: true,
            parallx: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            on: {
                slideChangeTransitionStart: function () {
                    for (let i = 0; i < this.slides.length; i++) {
                        if (this.slides.eq(i)) {
                            let el = this.slides.eq(i);
                            $(el.find(".row-left")[0]).css("opacity", "0").removeClass(
                                "elementBounceInLeft");
                            $(el.find(".row-right")[0]).css("opacity", "0").removeClass(
                                "elementBounceInRight");
                        }
                    }
                },
                slideChangeTransitionEnd: function () {
                    let _active = this.slides.eq(this.activeIndex);
                    _active.find(".row-left").css("opacity", "1").addClass("elementBounceInLeft");
                    _active.find(".row-right").css("opacity", "1").addClass("elementBounceInRight");

                }
            }
        });
    }

});