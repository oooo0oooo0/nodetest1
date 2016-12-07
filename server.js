// 服务端
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8888);
    console.log("8888端口正在被侦听……");
}


exports.start = start;