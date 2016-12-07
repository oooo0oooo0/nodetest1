var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");
var url = require("url");

function start(response) {
    console.log("start被处理");
    var body = fs.readFileSync("form.html", "utf-8");
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();
    console.log("start请求处理完成");
}

function upload(response, request) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = './tmp/';     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(request, function (error, fields, files) {
        var filename = files.resource.name;
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var rand = Math.random() * 100 + 900;
        var num = parseInt(rand, 10);
        var avatarName = name + num + '.' + type;
        var newPath = form.uploadDir + avatarName;
        fs.renameSync(files.resource.path, newPath);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("上传内容是：\n\n");
        response.write("<img src='/show?imgname=" + newPath + "'>");
        response.end();
    });
}

function show(response, request) {
    var imgname = url.parse(request.url,true).query.imgname;
    if(!imgname)
    {
        imgname="./tmp/bgi1.jpg";
    }
    fs.readFile(imgname, "binary", function (error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write("error：" + error);
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/jpg" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;