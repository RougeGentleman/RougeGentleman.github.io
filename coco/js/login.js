window.onload = function () {
    //设置登陆点击按钮时间
    let _loginButton = document.querySelector("#loginButton");
    //设置登陆按钮点击事件
    _loginButton.onclick = function(ev){
        checkoutUserNameInput();
        checkoutPasswordInput();
        ev.preventDefault();//FF等阻止DOM节点默认行为，这里是提交表单的行为
        ev.stopPropagation();
    }

    //设置输入框获取焦点时删除提示文字
    let _userNameInput = document.querySelector("#input-userName");
    let _passwordInput = document.querySelector("#input-password");

    _userNameInput.addEventListener("focus", function(){
        //删除提示文字
        removeTipElement(this.parentElement);
    });

    _passwordInput.addEventListener("focus", function(){
        //删除提示文字
        removeTipElement(this.parentElement);
    });
}

//方法: 用于判断用户名输入框是否输入规范
function checkoutUserNameInput() {
    let _result = false;
    //获取选择进行判断的元素
    let _element = document.querySelector("#input-userName");
    if(_element.value.length <= 0){
        _result = false;
        //添加提示文字
        addTipElement(document.querySelector(".main-content-name"), "不能为空!");
    }else{
        _result = true;
    }
    return _result;
}

//方法: 用于判断用户密码是否规范
function checkoutPasswordInput(){
    let _result = false;
    //获取选择进行判断的元素
    let _element = document.querySelector("#input-password");
    if(_element.value.length <= 0){
        _result = false;
        //添加提示文字
        addTipElement(document.querySelector(".main-content-password"), "不能为空!");
    }else{
        _result = true;
    }

    return _result;
}

//方法: 用于在指定元素后添加子元素
function addTipElement(element, str){
    let _e = document.createElement("span");
    _e.innerText = str;
    _e.className = "inputError";
    element.appendChild(_e);
}

//方法: 用于删除错误提示
function removeTipElement(element){
    let _e = element.querySelector(".inputError");
    if(_e){
        element.removeChild(_e);
    }
}