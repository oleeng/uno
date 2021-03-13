const crypto = require('crypto');

class UnoApp {
    constructor() {
		this.rooms = {}
		this.roomKeys = []
	}

    addRoom(room){
		if(this.rooms[room.key] !== undefined) {
			// evt do some stuff
			return
		}else {
			// do some other stuff
			this.roomKeys.push(room.key)
			this.rooms[room.key] = room
		}
	}

	/**
	 * Checks, if the room with the given roomKey is in an active game, or in the People-Join-Phase
	 * @param roomKey
	 * @return {boolean} true, if the room is in an active game; false, if not
	 */
	roomIsInActiveGame(roomKey) {
    	//TODO Was, wenn es keinen Raum mit der übergebenen roomKey gibt
    	return this.rooms[roomKey].isInGame()
	}

	/**
	 * Checks, if there is an existing room with the given roomKey as it's room key
	 * @param roomKey
	 * @return {boolean} true, if a room with given key exists; false, if not
	 */
	hasRoom(roomKey) {
		return this.roomKeys.includes(roomKey)
	}

	getAllKeys(){
		return this.roomKeys
	}

	getUser(roomKey, userId) {
		const room = this.rooms[roomKey]

		for(let i = 0; i < room.users.length; i++) {
			if(room.users[i].getId() === userId) {
				return room.users[i].getName()
			}
		}

		// if there is no user with the given userId in the room
		return undefined
	}


}

class User {
	constructor(name, type) {
		this.userId = '_' + Math.random().toString(36).substr(2, 9);
		this.name = name
		this.type = type
	}

	getId() {
		return this.userId
	}

	getName() {
		return this.name
	}
}

class Room {
	constructor(key) {
		this.key = key
		this.users = []
		this.inActiveGame = false
	}

	isInGame() {
		return this.inActiveGame
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
   * @param {Array} allKeys list of all currently used Room Keys
   * @return {String} resultKey: The newly generated Key for a new Room
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