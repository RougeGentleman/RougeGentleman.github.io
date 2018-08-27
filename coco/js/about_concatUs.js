loadJScript();

function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=HdDLuL0u7EF4nBT5QoZzSMg0akAVzT1r&callback=init";
    document.querySelector("body").appendChild(script);
}

function init() {
    var map = new BMap.Map('map-container');
    var poi = new BMap.Point(116.379799, 40.0151941);
    map.centerAndZoom(poi, 20);
    // 编写自定义函数,创建标注
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
    addMarker(new BMap.Point(116.379799, 40.0151941));
}