const crypto = require('crypto');

class UnoApp {
    constructor() {
		this.rooms = {}
		this.roomKeys = []
	}

    addRoom(room){
		if(this.rooms[room.key] != undefined) {
			// evt do some stuff
			return
		}else {
			// do some other stuff
			this.roomKeys.push(room.key)
			this.rooms[room.key] = room
		}
	}

	getAllKeys(){
		return this.roomKeys
	}
}

class User {
	constructor(name, type) {
		let tmpId = String(name) + String(Date.now())
		tmpId = crypto.createHash('sha256').update(tmpId).digest('base64')
        this.userId = String(tmpId);
		this.name = name
		this.type = type
	}
}

class Room {
	constructor(key) {
		this.key = key
		this.users = []
	}

	addUser(user) {
		this.users.push(user)
	}

	deleteUser(user){
		
	}
}

 /**
   * Generates a new, unused Room Key
   *
   * @param {allKeys} a list of all currently used Room Keys 
   * @return {resultKey} The newly generated Key for a new Room
   */
function generateRoomKey(allKeys) {
    let resultKey = ''
    let variables = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for(let i = 0; i < 7; i++) {
		let index = Math.floor(Math.random()*36)
        resultKey += variables.charAt(index)
    }

	if(allKeys.includes(resultKey)){
		resultKey = generateRoomKey(allKeys)
	}

    return resultKey
}

module.exports = {
  UnoApp,
  User,
  Room,
  generateRoomKey
};