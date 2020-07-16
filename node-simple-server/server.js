const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
  const fileName = req.url == '/' ? '/index.html' : req.url;
  console.log(req.url);

  fs.readFile(`.${fileName}`,(err,data) => {
    if(err) {
      res.statusCode = 404;
      res.setHeader('Content-type','text/plain');
      res.end(`${err}`);
    } else {
      res.statusCode = 200;
      res.setHeader('Content-type','text/html');
      res.end(data);
    }
  });
});
server.listen(8001,() => {
  console.log('Server is running, uses callbacks');
});