function _toNext(){
    var i;
    var j;
    for(i=0; i<10;i++){
        _next:
        for(j=0; j<10; j++){
            if(j==5){

                break _next;
            }
        }
        alert("i: "+i+"\n j:"+j);
    }
}

function _clearStyle(_var){
    _var.innerText="";
    _var.style.backgroundColor="#ccc0b2";
    _var.style.color="#000000";
}