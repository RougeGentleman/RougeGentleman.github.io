$(()=>{
    //首先判断传递的href值,查找对应的数据
    //在获取相对应的数据后进行显示

    //页面类型
    let pageType;
    //页面总数
    let pageCount;
    //当前页面索引
    let pageIndex;


    pre();

    //准备函数
    function pre(){
        //加载公共头部与公共底部
        $(".header").load("header.html");
        $(".footer").load("footer.html");

        analyzeUrl();
    }

    //方法: 获取hash 中的数据, 加载指定的数据
    function analyzeUrl(){
        let _search = window.location.search;
        // if(_search.length <=1){
        //     //search中没有数值, 默认跳转到首页
        //     window.location.href = "index.html";
        // }
        let _result = querySearchString(_search);
        let array = getData(_result["type"], _result["page"]);
        addResult(array);

        //设置底部按钮相关内容
        setPageButton();
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

    //方法: 根据class加载 list 页面
    function getData(s, p){
        let _type = parseInt(s);
        let _page = parseInt(p);
        console.log("type"+_type+" page:"+_page);
        //加载结果
        let _result = null;
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
        pageIndex = _page;
        pageCount =(_result.length - (_result.length % 4))/4;
        pageCount +=(_result.length % 4)!==0 ? 1:0;
        pageType = _type;

        //获取指定页数的数据
        if(!_page || _page < 1){return;}
        _result = _result.slice((_page-1) * 4, _page * 4);

        return _result;
    }

    //方法: 底部翻页按钮刷新
    function setPageButton(){
        //因移动元素点击事件失效, 因此将页码生成放到第一个
        let buttonContainer = $(".main-pageButtons");
        //添加页码
        for(let i=1; i <= pageCount; i++){
            let _button = document.createElement("button");
            if(pageIndex === i){
                _button.className = "main-toIndex main-toIndex-selected";
            }else{
                _button.className = "main-toIndex";
                setClickEvent($(_button), i);
            }
            _button.innerText = ""+i;
            buttonContainer[0].appendChild(_button);
        }

        //1. 判断可否进行上一页,下一页点击
        if(pageIndex > 1){
            let _previousButton = $(".main-previousButton");
            _previousButton.addClass("buttonClickable");
            setClickEvent(_previousButton, pageIndex-1);
        }else{
            $(".main-previousButton").removeClass("buttonClickable");
        }
         //将下一页按钮移动到元素最后
        $(".main-nextButton").appendTo($(".main-pageButtons"));
        if(pageIndex < pageCount){
            let _nextButton = $(".main-nextButton");
            _nextButton.addClass("buttonClickable");
            console.log(_nextButton);
            setClickEvent(_nextButton, pageIndex+1);
        }else{
            $(".main-nextButton").removeClass("buttonClickable");
        }
    }

    //方法: 将数据添加到页面
    function addResult(result){
        let mainContent = $(".main-content");
        for(let i=0; i<result.length; i++){
            let row = document.createElement("div");
            row.className = "row";
            let questionTitle = document.createElement("p");
            questionTitle.className = "question-title";
            questionTitle.innerText = result[i].title;

            //TODO: 设置标题点击事件
            questionTitle.onclick = ()=>{
                let _url = location.href.substring(0, location.href.lastIndexOf("/"))+"/help_article.html";
                window.location.href = _url+"?type="+pageType+"&id="+(i+1);
            }

            let questionDes = document.createElement("p");
            questionDes.className = "question-des";
            let _len = result[i].content.length;
            if(_len >= 5){
                _len = 5;
            }
            for(let j=0; j<_len; j++){
                questionDes.innerText += result[i].content[j];
            }

            let questionIntro = document.createElement("p");
            questionIntro.className = "question-intro";

            let questionTime = document.createElement("span");
            questionTime.className = "question-time";
            questionTime.innerText = result[i].date;

            let questionSee = document.createElement("span");
            questionSee.className = "question-see";

            let questionSeeIcon = document.createElement("i");
            questionSeeIcon.className = "iconfont icon-list-see";
            let questionSeeCount = document.createElement("span");
            questionSeeCount.innerText = result[i].see;

            //附加元素
            questionIntro.appendChild(questionTime);

            questionSee.appendChild(questionSeeIcon);
            questionSee.appendChild(questionSeeCount);
            questionIntro.appendChild(questionSee);

            row.appendChild(questionTitle);
            row.appendChild(questionDes);
            row.appendChild(questionIntro);

            mainContent[0].appendChild(row);
        }
    }

    //方法: 根据传入的索引值生成点击跳转事件
    function setClickEvent(element, index){
        element.click(()=>{
            //截取最后.html的部分, 之后添加对应参数
            let _url = location.href.substring(0, location.href.lastIndexOf("?"));
            location.href = _url+"?type="+pageType+"&page="+index;
        });
    }

    //方法: 设置文章标题的点击事件
    function setTitleClickEvent(){

    }
});