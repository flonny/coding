
const http = require('http')
const server = http.createServer((req, res) => {
    console.log("request receiced")
    console.log(req.headers)
    // console.log(req)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`<html lang=en>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>promiseA+</title>
      <style>
        body p{
          color:#fff
        }
      </style>
    </head>
    <body>
      
    </body>
    </html>`);
  });
  server.listen(8088);