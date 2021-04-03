var socket = io()

const roomKey = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

socket.on('connect', () => {
    socket.emit('joinRoom', {roomKey, userId})
})

socket.on('userJoined', nameOfJoiningUser => {
    console.log(nameOfJoiningUser + "joined")
})

function leaveRoom() {
    socket.emit("leaveRoom", {roomKey, userId})
}

socket.on('userDisconnected', nameOfDisconnectedUser => {
    console.log(nameOfDisconnectedUser + " disconnected")
})

function leaveRoom() {
    socket.emit("leaveRoom", {roomKey, userId})
}
