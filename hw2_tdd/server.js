const http = require('http');
const fs = require('fs');
const { isRegExp } = require('util');

const server = http.createServer((req,res) => {
  const fileName = req.url == '/' ? '/index.html' : req.url;
  console.log(fileName);

  fs.readFile(`.${fileName}`,(err,data) => {
    if(err) {
      res.statusCode = 404;
      res.setHeader('Content-type','text/plain');
      res.end(`${err}`);
    } else {
      res.statusCode = 200;
      if(/\.js/.test(fileName)) {
        res.setHeader('Content-type','text/javascript');
      } else {
        res.setHeader('Content-type','text/html');
      }
      res.end(data);
    }
  });
});
server.listen(8000,() => {
  console.log('Server is running on http://localhost:8000');
});