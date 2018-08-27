//插件: 音乐播放插件


$(()=>{
    //准备音频数组
    let musicArray = [
        //音频2
        {
            title:"Equinox - Audio Machine.mp3",
            src:"audio/2.mp3",
            cover:"img/extra/music/cover/cover2.png"
        },
        //音频3
        {
            title:"Victory - Two Steps From Hell",
            src:"audio/3.mp3",
            cover:"img/extra/music/cover/cover3.png"
        },
        //音频4
        {
            title:"石崎ひゅーい - 夜間飛行",
            src:"audio/4.mp3",
            cover:"img/extra/music/cover/cover4.png"
        },
        //音频1
        {
            title:"Belle & Sebastian - Get Me Away From Here, I'm Dy",
            src:"audio/1.mp3",
            cover:"img/extra/music/cover/cover1.png"
        },
    ];
    //音频对象
    let audioElement = document.querySelector(".music-audio");
    //设置下拉列表内容
    insertMusicToList(document.querySelector(".music-list"), musicArray);
    //list列表是否已经显示
    let listIsShow = false;
    // 音频控制部分是否已显示
    let musicControlIsShow = true;
    //音频索引
    let musicIndex = 0;
    //音频播放定时器
    let musicPlayTimer;


    //设置下拉列表点击显示和隐藏
    $(".music-listButton").click(function(){
        musicListControl();
    });

    //方法: 为music-list中填入内容
    function insertMusicToList(listElement, musicArray){
        musicArray.forEach((item, index, array)=>{
            let _musicItemElement = document.createElement("li");
            let _itemContainer = document.createElement("div");
            let _itemIndexElement = document.createElement("span");
            let _itemTitleElement = document.createElement("span");
            let _itemTimeElement  = document.createElement("span");
            //设置单个项Class名
            _musicItemElement.className = "music-list-item";
            //设置音频索编号
            _itemIndexElement.innerText = (index+1)+"";
            _itemIndexElement.className = "music-item-index";
            //设置音频名称
            _itemTitleElement.innerText = item.title;
            _itemTitleElement.className = "music-item-title";
            //设置音频时间
            _itemTimeElement.className = "music-item-time";
            //附加所需元素
            _itemContainer.appendChild(_itemIndexElement);
            _itemContainer.appendChild(_itemTitleElement);
            _itemContainer.appendChild(_itemTimeElement);
            _musicItemElement.appendChild(_itemContainer);
            listElement.appendChild(_musicItemElement);
        });
    }
    //设置点击事件
    $(".music-previous").click(ev=>{
        playPrevious();
    });
    $(".music-next").click(ev=>{
        playNext();
    });
    $(".music-play").click(ev=>{
        if(audioElement.paused) {
            if(musicIndex<0){
                playNext();
            }else{
                audioElement.play();
            }
            $(".music-play i").removeClass("icon-music-play").addClass("icon-music-pause");
        }else{
            audioElement.pause();
            $(".music-play i").removeClass("icon-music-pause").addClass("icon-music-play");
        }
        setMusicStyle();
    });

    //设置音频列表中点击效果
    $(".music-list li").click(function(){
        playWithIndex($(this).index());
    });

    //设置缩小按钮点击效果 => 隐藏音频控制栏
    $("#music-close").click(()=>{
        musicListControl(false, musicControllerControl);
    });

    //设置专辑封面点击效果
    $(".music-cover").click(ev=>{
        musicListControl(false, musicControllerControl);
    });

    //TODO: 默认执行方法
    (()=>{
        audioElement.src = musicArray[musicIndex].src;
        $(".music-list li").removeClass("music-nowPlay");
        //设置播放定时器
        setProgressTimer();
        //开始自动播放
        playWithIndex(0);
        //默认缩小显示
        musicControllerControl(false);
    })();

    //方法: 播放下一首
    function playNext(){
        musicIndex++;
        if(musicIndex === musicArray.length){
            musicIndex = 0;
        }
        audioElement.src = musicArray[musicIndex].src;
        audioElement.load();
        audioElement.play();
        setMusicStyle();
    }

    //方法: 播放上一首
    function playPrevious(){
        musicIndex--;
        if(musicIndex < 0){
            musicIndex = musicArray.length;
        }
        audioElement.src = musicArray[musicIndex].src;
        audioElement.load();
        audioElement.play();
        setMusicStyle();
    }

    //方法: 根据指定索引播放音乐
    function playWithIndex(index){
        audioElement.src = musicArray[index].src;
        audioElement.load();
        audioElement.play();
        musicIndex = index;
        setMusicStyle();
    }

    //方法: 根据当前索引,设置需要改变的元素
    function setMusicStyle(){
        //设置音频标题
        $(".music-title #music-title-content").text(musicArray[musicIndex].title);
        //设置下拉列表正在播放的项显示效果
        // $(".music-list li").find(".music-item-index").removeClass("music-nowPlay").eq(musicIndex).addClass("music-nowPlay");
        // $(".music-list li").eq(musicIndex).addClass("music-nowPlay").siblings().removeClass("music-nowPlay");
        $(".music-list li div").removeClass("music-nowPlay").eq(musicIndex).addClass("music-nowPlay");

        if(audioElement.paused) {
            $(".music-play i").removeClass("icon-music-pause").addClass("icon-music-play");
            $(".music-cover img").removeClass("music-cover-play").addClass("music-cover-pause");
        }else{
            $(".music-play i").removeClass("icon-music-play").addClass("icon-music-pause");
            $(".music-cover img").removeClass("music-cover-pause").addClass("music-cover-play");
        }
        //设置专辑图片
        if(!musicArray[musicIndex].cover||musicArray[musicIndex].cover.length===0){
            // $(".music-cover img").parent().css("background", "white")[0].src = "img/extra/music_cover_none.jpg";
        }else{
            $(".music-cover img")[0].src = musicArray[musicIndex].cover;
        }
    }

    //方法: 用于控制音频列表的显示与隐藏
    function musicListControl(control, fn){
        //判断需要执行哪种效果, true/false效果
        let _is = !listIsShow;
        if(typeof control === "boolean"){
            _is = control;
        }
        if(_is){
            $(".music-listButton").css({
                "transform":"rotate(180deg)",
                "transition":"all 300ms"
            });
            $(".music-list").stop().slideDown(300, fn);
            listIsShow = true;
        }else{
            $(".music-listButton").css({
                "transform":"rotate(0deg)",
                "transition":"all 300ms"
            });
            $(".music-list").stop().slideUp(300, fn);
            listIsShow = false;
        }
    }
    //方法: 用于控制 music-control 部分的显示与隐藏
    function musicControllerControl(control){
        //判断需要执行哪种效果, true/false效果
        let _is = !musicControlIsShow;
        if(typeof control === "boolean"){
            _is = control;
        }
        if(_is){
            $(".music-control").stop().show(300);
            $(".extra-music").animate({
                "border-radius":"0",
            }, 300);
            $(".music-cover").animate({
                "border-radius":"0",
            }, 300).find("img").removeClass("music-cover-show");
            musicControlIsShow = true;
            $(".music-progress").show();
        }else{
            $(".music-control").stop().hide(300);
            $(".extra-music").css({
                "border-radius":"50% 0 0 50%",
            });

            $(".music-cover").animate({
                "border-radius":"50%"
            }, 300).find("img").addClass("music-cover-show");
            musicControlIsShow = false;
            $(".music-progress").hide();
        }
    }

    //方法: 定时器 => 用于设置播放进度
    function setProgressTimer(){
        let _progress = $("#progress-content");
        let count = 0;
        musicPlayTimer = setInterval(()=>{
            //设置播放进度
            _progress.width(_progress.parent().width()*(audioElement.currentTime/audioElement.duration));
            //播放完成，自动播放下一首
            // if(audioElement.currentTime === audioElement.duration()){
            //     playNext();
            // }
            if(audioElement.ended){
                playNext();
            }
        }, 10);
    }

    /**
     * 方法: 用于定义事件
     * 用于: 当某段代码执行完成, 进行事件广播, 触发另一个事件
     * @param{string} eventName 该监听该事件事件时一般需要加上: '*-loaded'
     * @param{object} initOption
     * @param{object} initPre
     */
    function dispatchMyEvent(eventName, initOption, initPre){
        let _ev = new Event(eventName, initOption);
        //TODO: 待实现 => 设置默认属性或方法
        //附加事件
        document.dispatchEvent(_ev);
    }
});



