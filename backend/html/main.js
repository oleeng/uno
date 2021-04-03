var socket = io()

function create() {
	let username = document.getElementById("username").value
	if(username === "") {
		alert("bitte einen usernamen eingeben")
		return
	}
	socket.emit('createRoom', username)
}

socket.on('roomCreated', ({roomKey, hostId}) => {
	console.log(roomKey)
	window.location.href = "/" + roomKey + "/" + hostId
})