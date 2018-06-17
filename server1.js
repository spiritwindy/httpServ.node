var { existsSync,statSync ,readdirSync} = require("fs");
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
      var pStat=statSync(p);
       if(pStat.isFile())
      return res.sendfile(p)
      else if(pStat.isDirectory()){
       return res.send(list(p,req.path))  
      }
    }
    var back = [".html", ".js", ".css"];
    for (let i = 0; i < back.length; i++) {
      if (existsSync(p + back[i])) {
        console.log(p + back[i]);
        if(statSync(p + back[i]).isFile())
        return res.sendfile(p + back[i]);
      }
    }
    res.status(500);
    res.send("disable");
  } else {
    res.status(500);
    res.send("disable");
  }
});
/**
 * 
 * @param {*} dir 
 */
function list(dir,baseUrl) {
  return readdirSync(dir).map(function (params) {
    return `<a href="${baseUrl+params}">${params}</a><br>`
  }).join("")
}