var { existsSync } = require("fs");

var http = require("http");
var express = require("express");
var app = express();
var path = require("path");

var serverPath = process.argv[2] || "E:/web/jslinux/bellard/bellard.org/";
serverPath = path.join(serverPath);

app.use(express.static(serverPath));
// 创建服务端
var port = 80;
http.createServer(app).listen(port, function() {
  console.log("启动服务器完成,端口" + port + ";路径" + serverPath);
});
app.get("*", function(req, res) {
  var p = path.join(serverPath, req.path);
  if (p.includes(serverPath)) {
    if (existsSync(p)) {
      console.log(p);
      return res.sendfile(p);
    }
    var back = [".html", ".js", ".css"];
    for (let i = 0; i < back.length; i++) {
      if (existsSync(p + back[i])) {
        console.log(p + back[i]);
        return res.sendfile(p + back[i]);
      }
    }
  } else {
    res.send("disable");
  }
});
