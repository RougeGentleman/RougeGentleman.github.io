/*---------网页版2048------------*/

// 用于存储每行每列的数值
var _pointArray=Array([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);
// 用于存储id变量的数组
var _spanVar=Array(4, 4);
// var _spanVar=Array([a1, a2, a3, a4], [b1, b2, b3, b4], [c1, c2, c3, c4], [d1, d2, d3, d4]);
//该数组用于存放空白位置的坐标
var _blankArray=Array([0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0]);

// 用于生成数值时x y坐标
var _x;
var _y;

//用于显示总分数
var totalScore=0;
var scoreSpan;

//上下左右按钮
var leftButton;
var rightButton;
var upButton;
var downButton;
//重置按钮、开始按钮
var resetButton;

// HTML已加载完成，开始执行开始函数
window.onload=pre;


//准备函数
//该函数在文档加载完成后执行
//用于初始化需要的标签变量
function pre(){
    //标签变量
    var a1, a2, a3, a4;
    var b1, b2, b3, b4;
    var c1, c2, c3, c4;
    var d1, d2, d3, d4;

    //开始提取id，并进行赋值
    //第一行
    a1=document.getElementById("main_a1");
    a2=document.getElementById("main_a2");
    a3=document.getElementById("main_a3");
    a4=document.getElementById("main_a4");
    //第二行
    b1=document.getElementById("main_b1");
    b2=document.getElementById("main_b2");
    b3=document.getElementById("main_b3");
    b4=document.getElementById("main_b4");
    //第三行
    c1=document.getElementById("main_c1");
    c2=document.getElementById("main_c2");
    c3=document.getElementById("main_c3");
    c4=document.getElementById("main_c4");
    //第四行
    d1=document.getElementById("main_d1");
    d2=document.getElementById("main_d2");
    d3=document.getElementById("main_d3");
    d4=document.getElementById("main_d4");
    _spanVar=Array([a1, a2, a3, a4], [b1, b2, b3, b4], [c1, c2, c3, c4], [d1, d2, d3, d4]);

    //获取显示分数标签
    scoreSpan=document.getElementById("score");

    //上下左右按钮
    leftButton=document.getElementById("leftButton");
    rightButton=document.getElementById("rightButton");
    upButton=document.getElementById("upButton");
    downButton=document.getElementById("downButton");
    //重置、开始按钮
    resetButton=document.getElementById("resetButton");

    //设置点击事件
    setOnclickEvent();

    //开始游戏
    start();
}

//开始今昔游戏函数
function start(){
    //获取抽取的次数
    var count=Math.round(Math.random()*16);

    //开始进行抽取，并进行存放
    for(var i=0; i<count; i++){
        //生成一次位置
        getXY();
        //判断数组中在本次位置是否含有数值，有则跳过
        //如果没有就存放
        var _point=_pointArray[_x][_y];
        if(_point==0){
            _pointArray[_x][_y]=2;
        }else{
            continue;
        }
    }
    showPoint_1();
}

//该方法用于：生成x y位置
function getXY(){
    _x=Math.round(Math.random()*3);
    _y=Math.round(Math.random()*3);
}

//该方法用于把数组中的数值进行显示
function showPoint_1(){
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(_pointArray[i][j]!=0) {
                _spanVar[i][j].innerText=""+_pointArray[i][j];
                setStyle_1(_spanVar[i][j], _pointArray[i][j]);
                //更新总分数
            }else{
                _spanVar[i][j].innerText="";
                setStyleBack((_spanVar[i][j]));
            }
        }
    }
}


//在原有的基础上添加，不同的分数，不同的背景色
function setStyle_1(_var, _point){
    if(_point==2){
        _var.style.backgroundColor="#ece4d9";
    }else if (_point==4){
        _var.style.backgroundColor="#ece0c6";
    }else if (_point==8){
        _var.style.backgroundColor="#f2b179";
    }else if (_point==16){
        _var.style.backgroundColor="#f59562";
    }else if (_point==32){
        _var.style.backgroundColor="#f57c5f";
    }else if (_point==64){
        _var.style.backgroundColor="#f45e39";
    }else if (_point==128){
        _var.style.backgroundColor="#eccf71";
    }else if (_point==256){
        _var.style.backgroundColor="#eccc5f";
    }else if (_point==512){
        _var.style.backgroundColor="#ecc84e";
    }else if (_point==1024){
        _var.style.backgroundColor="#ecc84e";
    }else if (_point==2048){
        _var.style.backgroundColor="#ecc84e";
    }else if (_point==4096){
        _var.style.backgroundColor="#ecc84e";
    }else if (_point==8192){
        _var.style.backgroundColor="#ecc84e";
    }else if (_point==16384){
        _var.style.backgroundColor="#ecc84e";
    }else{
        _var.style.backgroundColor="#ecc84e";
    }
    _var.style.color="#000";
}
//设置已添加数字的id样式
function setStyle(_var){
    _var.style.backgroundColor="#ecc84e";
    _var.style.color="#fff";
}
//设置当id内没有数字时的样式
function setStyleBack(_var){
    _var.innerText="";
    _var.style.backgroundColor="#ccc0b2";
}

//设置键盘输入响应事件
window.document.onkeydown=_kbdEvent;
//该方法用于处理键盘输入事件
// ← 37
// ↑ 38
// → 39
// ↓ 40
function _kbdEvent(evt){
    evt=(evt)? evt: window.event;
    var _keyCode=evt.keyCode;
    if( _keyCode==37){
        toLeft();
    }else if( _keyCode==38){
        toUp();
    }else if( _keyCode==39){
        toRight();
    }else if(_keyCode==40){
        toDown();
    }
}


function toLeft(){
    /*
    *  左移过程：
    *  1.索引1指向左边第一个，查看当前位置是否有数值1，有则移到下一个位置
    *  2.当下一个位置没有数值2，继续右移
    *  3.索引指向位置含有数值2，就从当前位置往左移动，
    *  4.当左移的索引2位置没有数值就继续左移索引2
    *  5.当左移的索引2位置含有数值1，则查看数值1与数值2是否相等
    *  6.相等，则数值1与数值2相加，并使数值2为0, 索引1继续右移
    *  7.不相等，之后索引2右移，查看索引2指示的位置是否有空的数值，有：则将数值2移动到上一个数值为空的位置，如果没有：则不变, 索引1 重新执行1往右移
    *  8.当索引达到限制时，切换到下一行
    * */
    for(var i=0; i<4; i++){
        for(var k=1; k<4;k++){
            if(_pointArray[i][k]!=0){
                for(var g=0; g<k; g++){
                    if(_pointArray[i][g]==0){
                        _pointArray[i][g]=_pointArray[i][k];
                        _pointArray[i][k]=0;
                    }else if(_pointArray[i][g]!=0 && _pointArray[i][g]==_pointArray[i][k]){
                        _pointArray[i][g]+=_pointArray[i][k];
                        //累加分数并进行显示
                        totalScore+=_pointArray[i][g];
                        showScore();
                        _pointArray[i][k]=0;
                    }
                }
            }
        }
    }
    //叠加完成， 在随机位置添加数值
    getPointRandom();
    //执行完成，进行显示改变的数值
    showPoint_1();
}

//上移方法
function toUp(){
    for(var i=0; i<4; i++){
        for(var k=1; k<4;k++){
            if(_pointArray[k][i]!=0){
                for(var g=0; g<k; g++){
                    if(_pointArray[g][i]==0){
                        _pointArray[g][i]=_pointArray[k][i];
                        _pointArray[k][i]=0;
                    }else if(_pointArray[g][i]!=0 && _pointArray[g][i]==_pointArray[k][i]){
                        _pointArray[g][i]+=_pointArray[k][i];
                        //累加分数
                        totalScore +=_pointArray[g][i];
                        //进行显示总分数
                        showScore();
                    }
                }
            }
        }
    }
    //叠加完成， 在随机位置添加数值
    getPointRandom();
    //执行完成，进行显示改变的数值
    showPoint_1();
}

//右移方法
function toRight(){
    for(var i=0; i<4; i++){
        for(var k=2; k>=0;k--){
            // _arrayToString();
            if(_pointArray[i][k]!=0){
                for(var g=3; g>k; g--){
                    if(_pointArray[i][g]==0){
                        _pointArray[i][g]=_pointArray[i][k];
                        _pointArray[i][k]=0;
                    }else if(_pointArray[i][g]!=0 && _pointArray[i][g]==_pointArray[i][k]){
                        _pointArray[i][g]+=_pointArray[i][k];
                        //累加分数并进行显示
                        totalScore+=_pointArray[i][g];
                        showScore();
                        _pointArray[i][k]=0;
                    }
                }
            }
        }
    }
    //叠加完成， 在随机位置添加数值
    getPointRandom();
    //执行完成，进行显示改变的数值
    showPoint_1();
}

//下移方法
function toDown(){
    for(var i=0; i<4; i++){
        for(var k=2; k>=0;k--){
            // _arrayToString();
            if(_pointArray[k][i]!=0){
                for(var g=3; g>k; g--){
                    if(_pointArray[g][i]==0){
                        _pointArray[g][i]=_pointArray[k][i];
                        _pointArray[k][i]=0;
                    }else if(_pointArray[g][i]!=0 && _pointArray[g][i]==_pointArray[k][i]){
                        _pointArray[g][i]+=_pointArray[k][i];
                        //累加分数
                        totalScore +=_pointArray[g][i];
                        //进行显示总分数
                        showScore();
                        _pointArray[k][i]=0;
                    }
                }
            }
        }
    }
    //叠加完成， 在随机位置添加数值
    getPointRandom();
    //执行完成，进行显示改变的数值
    showPoint_1();
}

//在随机位置添加数值
//需要判断位置是否已满
function getPointRandom(){
    //用于累加数组中空白位置
    var _whiteCount=0;
    //利用for循环获取所有空的位置，累加空的数量
    //之后将这些空的位置添加到数组中
    //最后利用空的数量随机生成位置
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            if(_pointArray[i][j]==0){
                _blankArray[_whiteCount][0]=i;
                _blankArray[_whiteCount][1]=j;
                _whiteCount++;
            }
        }
    }
    //所有空白位置已累加，
    //进行抽取并添加
    //当已满时取消随机添加数
    if(_whiteCount!=0){
        // alert(_whiteCount);
        var _add=Math.round(Math.random()*(_whiteCount-1));
        _pointArray[_blankArray[_add][0]][_blankArray[_add][1]]=2;
    }
}

//该方法用于在每次数字叠加时进行总分显示
function showScore(){
    scoreSpan.innerText=totalScore+"";
}

//该方法用于重置游戏数据并重新开始抽取数值
function toReset(){
    //将数组中分数清零
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            _pointArray[i][j]=0;
        }
    }
    //重置总分数
    totalScore=0;
    //并重新显示分数
    showScore();
    //开始新的游戏
    start();
}

//该方法用于设置点击事件
function setOnclickEvent(){
    //设置上下左右按钮点击事件
    leftButton.onclick=toLeft;
    rightButton.onclick=toRight;
    upButton.onclick=toUp;
    downButton.onclick=toDown;
    //设置重置按钮点击事件
    resetButton.onclick=toReset;
}


function _arrayToString(){
    var _string="";
    for(var i=0; i<4; i++){
        for(var j=0; j<4; j++){
            _string+=_pointArray[i][j]+" ";
        }
        _string+="\n";
    }
    alert(_string);
}