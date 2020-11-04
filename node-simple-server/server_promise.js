const http = require('http');
const fs = require('fs');
const util = require('util');

const server = http.createServer((req,res) => {
  const fileName = req.url == '/' ? '/index.html' : req.url;

  console.log(req.url);

  const readFile = util.promisify(fs.readFile);

  readFile(`.${fileName}`)
    .then( data => {
      res.statusCode = 200;
      res.setHeader('Content-type','text/html');
      res.end(data);
    })
    .catch( err => {
      res.statusCode = 404;
      res.setHeader('Content-type','text/plain');
      res.end(`${err}`);
    });

});
server.listen(8000,() => {
  console.log('Server is running, uses promises');
});