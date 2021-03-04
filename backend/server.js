const express = require('express');
const app = express();
const http = require("http").createServer(app);
//const bodyParser = require('body-parser');
const io = require("socket.io")(http);
const path = require('path');

const redis = require("redis");
const client = redis.createClient({
    host: 'host.docker.internal',
    port: 6379
})

client.on("error", function(error) {
    console.error(error);
});

io.on('connection', (socket) => {
    socket.on('we lit', (msg) => {
        client.get(msg, function(err, reply) {
            // reply is null when the key is missing
            console.log(reply)
        });
        io.emit('ttt', "we lit as fuck on id: "+msg);
    });
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

const port = process.env.PORT || 5000;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('html'))

app.get('/', function(req, res){
    res.sendFile(path.resolve('html/test.html'));
});

app.get('/api/hello', (req, res) => {
    res.send("hello from express");
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