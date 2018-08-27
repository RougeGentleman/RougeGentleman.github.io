$(()=>{
    //首先判断传递的href值,查找对应的数据
    //在获取相对应的数据后进行显示

    //页面类型
    let pageType;
    //文章的具体编号
    let pageID;
    //上一篇帮助url
    let previousPage;
    //下一篇帮助url
    let nextPage;


    pre();

    //准备函数
    function pre(){
        //加载公共头部与公共底部
        $(".header").load("header.html", function(){
            //设置选择样式
            $(".header-help").addClass("header-nav-selected");
        });
        $(".footer").load("footer.html");

        analyzeUrl();

        setEvents();
    }

    //方法: 设置各种事件响应
    function setEvents(){
        //点击右边常见问题显示与隐藏更多内容
        $(".right-problem").click(function(){
            if($(this).hasClass("show-more")){
                $(".right-problem-more").slideUp(300);
                $(this).removeClass("show-more");
            }else{
                $(".right-problem-more").slideDown(300);
                $(this).addClass("show-more");
            }
        })
    }

    //方法: 获取hash 中的数据, 加载指定的数据
    function analyzeUrl(){
        let _search = window.location.search;
        let _result = querySearchString(_search);
        let array = getData(_result["type"], _result["id"]);
        addResult(array);

        //设置底部按钮相关内容
        setPageButton(array);

        //设置右边栏内容
        setRightSelectStyle();
    }

    /**
     * 方法: 解析查询字符串,以数组的形式返回解析结果 
     * @param {string} str search字符串
     * @return 返回解析结果对象
     */
    function querySearchString(str){
        let _str = str.substring(1);
        //拆分数组
        let _result = {};
        let _items = _str.split("&");
        let _item = null;
        let _value = null;
        let _length = _items.length;
        for(let i = 0; i<_length; i++){
            _index = _items[i].indexOf("=");
            _item = _items[i].substring(0, _index);
            _value = _items[i].substring(_index+1, _items[i].legnth);
            //当 _item 不为空时保存结果
            if(_item.length){
                _result[_item]=_value;
            }
        }
        return _result;
    }

    //方法: 根据class加载分组, 根据 id 获取指定文章
    //返回: 返回结果为一个数组, 0: 当前页面相关对象, 1: 上一页相关对象, 2: 下一页相关对象
    function getData(s, p){
        let _type = parseInt(s);
        let _id = parseInt(p);
        console.log("type"+_type+" id:"+_id);
        //加载结果
        let _result = null;
        //实际结果
        let result = new Array(3);
        if(typeof _type !== "number"){ return; }
        switch(_type){
            case 0:
                //加载所有
                _result = updateData.data.concat(problemData.start).concat(problemData.use).concat(problemData.app);
                break;
            case 1:
                //加载更新说明
                _result = updateData.data;
                break;
            case 2:
                //加载常见问题-入门
                _result = problemData.start;
                break;
            case 3:
                //加载常见问题-使用
                _result = problemData.use;
                break;
            case 4:
                //加载常见问题-app
                _result = problemData.app;
                break;
            case 5:
                //加载所有常见问题
                _result = problemData.start.concat(problemData.use.concat(problemData.app));
                break;
            default:
                _result = [];
                break;
        }

        //TODO: 设置相关全局属性
        pageID = _id;
        pageType = _type;

        //获取指定页数的数据
        //查找的文章不存在, 返回
        if(_id > 0 && _id < _result.legnth){return;}
        //保存文章
        result[0] = _result[_id-1];

        //基础 url 
        let _url = location.href.substring(0, location.href.lastIndexOf("?"));
        
        //设置上一页, 下一页数据对象
        if(_id > 1){
            result[1] = _result[_id - 2];
            previousPage = _url +"?type="+_type+"&id="+(_id-1);
        }
        if(_id < _result.length){
            result[2] = _result[ _id];
            nextPage = _url +"?type="+_type+"&id="+(_id+1);
        }

        console.log(result);

        return result;
    }

    //方法: 底部翻页按钮刷新
    function setPageButton(result){
        //上一页按钮
        if(result[1]){
            let pre = $(".main-previousButton");
            pre.append("上一页: "+result[1].title);
            //设置点击事件
            setClickEvent(pre, previousPage);
        }else{
            $(".main-previousButton").append("上一页: 没有了");
        }
        //下一页按钮
        if(result[2]){
            let next = $(".main-nextButton");
            next.append("下一页: "+result[2].title);
            //设置点击事件
            setClickEvent(next, nextPage);
        }else{
            $(".main-nextButton").append("下一页: 没有了");
        }
    }

    //方法: 将数据添加到页面
    function addResult(result){
        let mainContent = $(".main-content");

        $(".main-content-left").find(".question-title").append(result[0].title)
            .end().find(".question-date").append(result[0].date)
            .end().find(".question-time").append(result[0].time)
            .end().find(".question-see span").append(result[0].see);
        
        let _questionDesContainer = $(".question-des");
        //详细介绍内容
        result[0].content.forEach((item, index, array)=>{
            let _p = document.createElement("p");
            _p.innerText = item;
            _questionDesContainer[0].appendChild(_p);
        });
    }

    //方法: 根据传入的索引值生成点击跳转事件
    function setClickEvent(element, url){
        element.click(()=>{
            location.href = url;
        })
    }

    //方法: 设置右边与文章相关向样式
    function setRightSelectStyle(){
        switch(pageType){
            case 0:
                $(".right-problem").addClass(" content-right-des-selected");
                break;
            case 1:
                $(".right-update").addClass(" content-right-des-selected");
                break;
            case 2:
                $(".right-problem-start").addClass(" content-right-des-selected");
                break;
            case 3:
                $(".right-problem-use").addClass(" content-right-des-selected");
                break;
            case 4:
                $(".right-problem-app").addClass(" content-right-des-selected");
                break;
            case 5:
                $(".right-problem-all").addClass(" content-right-des-selected");
                break;
            default:
                break;
        }
    }
});