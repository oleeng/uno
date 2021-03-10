const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');
const {
  UnoApp,
  User,
  Room,
  generateRoomKey
} = require('./util/helper.js');

// Instantiate a Uno-Game
const Uno = new UnoApp()

app.use(express.static('html'))

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.sendFile(path.resolve('./html/test.html'));
})

app.get('/:room_key', function(req, res) {
    res.sendFile(path.resolve('./html/room/index.html'));
})

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});



io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createRoom', (username) => {
		let roomKey = generateRoomKey(Uno.getAllKeys())

        let tmpRoom = new Room(roomKey)
        Uno.addRoom(tmpRoom)

        let tmpUser = new User(username, "admin")
		tmpRoom.addUser(tmpUser)

		socket.join(roomKey)
        
        socket.emit('roomCreated', roomKey)
    });

    socket.on('disconnecting', () => {
        console.log('user disconnected')
    });
});
