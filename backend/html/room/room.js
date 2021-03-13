var socket = io()

const roomKey = window.location.pathname.substr(1).split("/")[0]
const userId = window.location.pathname.substr(1).split("/")[1]

socket.on('connect', () => {

    // URL includes "/:room_key/:user_id" => An existing user is trying to join an existing room
    if(window.location.pathname.substr(1).split("/").length === 2) {
        socket.emit('joinRoom', ({roomKey, userId}))

    } else if(window.location.pathname.substr(1).split("/").length === 1) {
        /* URL includes "/:room_key" => A new not existing user wants to join the room via a shared-link
         * and needs to input his username now
         */

        //TODO Check if room with room_key exists (localhost:3000/randomString should give an error)

        //TODO Create html input field for new user to input his username
        document.querySelector("body").innerHTML = "You are about to join a room. BUt first - create  a Username: "
    }

})
