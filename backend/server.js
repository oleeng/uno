const express = require('express');
const app = express();
const http = require("http").createServer(app);
//const bodyParser = require('body-parser');
const io = require("socket.io")(http);

io.on('connection', (socket) => {
    socket.on('we lit', (msg) => {
        io.emit('ttt', "we lit as fuck on id: "+msg);
    });
    console.log('a user connected');
    setTimeout((io) => {
        io.emit('otto', "test")
    }, 5000, io);
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

const port = process.env.PORT || 5000;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    let html = `
    <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>title</title>
            <script src="/socket.io/socket.io.js"></script>
            <script>
              var socket = io()
              let keys = location.search.substr(1).split("&")
              
              let id = ""
              
              for(let item of keys){
                  console.log(item)
                  let tmp = item.split("=");
                  if(tmp[0] == "key"){
                      id = tmp[1]
                  }
              }
              
              socket.emit('we lit', id);
              
              console.log(window.location.href)
              
              socket.on('otto', (msg) => {
                console.log(msg)
              });
              
              socket.on('ttt', (msg) => {
                console.log(msg)
              });
            </script>
          </head>
          <body>
          
          </body>
        </html>
    `
    res.send(html);
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});