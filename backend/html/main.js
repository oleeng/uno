var socket = io()

function create() {
	let username = document.getElementById("username").value
	if(username == "") {
		alert("bitte einen usernamen eingeben")
		return
	}
	socket.emit('createRoom', username)
}

socket.on('roomCreated', (key) => {
	window.location.href = "/" + key
})



/*let keys = location.search.substr(1).split("&")

let roomId = ""
let username = ""

for(let item of keys){
	let tmp = item.split("=");
	if(tmp[0] === "key"){
		roomId = tmp[1]
	}
	if(tmp[0] === "username"){
		username = tmp[1]
	}
}
username = username || "noname"+Math.floor(Math.random() * Math.floor(10000))

socket.emit('joinRoom', {
	"id": roomId,
	"username": username
})

document.getElementById('roomid').innerHTML = roomId
document.getElementById('user').innerHTML = username 



*/