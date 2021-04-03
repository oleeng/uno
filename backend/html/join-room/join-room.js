const roomKey = window.location.pathname.substr(1).split("/")[0]

function createUser() {
    const userName = document.getElementById('user-name').value
    this.state.socket.emit('createUser', {"roomKey": roomKey, "userName": userName})
}