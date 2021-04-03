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

// Wenn jemand per Einladugnslink beitritt und noch keine User ID hat
app.get('/:room_key', function(req, res) {
    res.sendFile(path.resolve('./html/join-room/join-room.html'));
})

// URL, wenn man als existierender User in einem Raum ist
app.get('/:room_key/:user_id', function(req, res) {
    res.sendFile(path.resolve('./html/room/room.html'));
})

http.listen(port, () => {
    console.log(`Listening on port ${port}`)
});



io.on('connection', (socket) => {

    /* 'createRoom' is emitted when the host enters his name and clicks the createRoom Button on index.html */
    socket.on('createRoom', (username) => {
		let roomKey = generateRoomKey(Uno.getAllKeys())

        let tmpRoom = new Room(roomKey)
        Uno.addRoom(tmpRoom)

        let tmpUser = new User(username, "admin")
		tmpRoom.addUser(tmpUser)


        // Der socket.join könnte überflüissig sein, da nachdem der Raum created wurde eine andere html geladen wird
        // und dieser socket sowieso disconnectd.
        // Der neue socket nach der href Weiterleitung wird unten in 'joinRoom' dem Raum hinzugefügt
//		socket.join(roomKey)

        const hostId = tmpUser.getId()
        console.log(hostId)
        socket.emit('roomCreated', {roomKey, hostId})
    });


    /* 'createUser' is being emitted when a user uses a sharelink to join an existin room and submits his chosen username */
    socket.on('createUser', ({roomKey, userName}) => {

        try {
            if(Uno.hasRoom(roomKey)) {
                const userId = Uno.createAndAddUserToRoom(roomKey, userName)
                io.emit("userCreated", userId)
            }
        }
        catch (e) {
            //TODO DO STH WHEN ROOM DOESNT EXIST
        }
    })


    /* 'joinRoom' is emitted when an existing user joins an existing room - the URL includes room_key and user_id
        => when app.get('/:room_key/:user_id') is called */
    socket.on('joinRoom', ({roomKey, userId}) => {

        if(Uno.hasRoom(roomKey)) {
            socket.join(roomKey)

            const nameOfJoiningUser = Uno.getUser(roomKey, userId)
            if(nameOfJoiningUser !== undefined) {
                io.in(roomKey).emit('userJoined', nameOfJoiningUser)
            }
        }
        //TODO Was soll passieren, wenn es den Raum oder den User nicht gibt
    })


    /* 'leaveRoom' is called when the user clicks on the leaveRoom Button in the room in room.html */
    socket.on('leaveRoom', ({roomKey, userId}) => {
        if(Uno.hasRoom(roomKey)) {
            const nameOfDisconnectedUser = Uno.disconnectUserFromRoom(roomKey, userId) // returns the username of the disconnected user
            io.in(roomKey).emit('userDisconnected', nameOfDisconnectedUser)
        }
        //TODO Was soll passieren, wenn es den Raum oder den User nicht gibt
    })

    
    socket.on('disconnecting', () => {
        console.log('user disconnected')
    });
});
