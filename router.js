function route(handle, pathname, response, request) {
    console.log("当前请求的URL是：" + pathname);
    if (typeof handle[pathname] == 'function') {
        handle[pathname](response, request);
    } else {
        console.log(pathname + "不是一个正确的请求");

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("404 NOT FOUND");
        response.end();

    }
}

exports.route = route;