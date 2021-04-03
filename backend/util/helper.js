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

	/**
	 * creates a user with the given username as its username property and adds it to the room with the given roomKey
	 * @param roomKey of the room the user is being added to
	 * @param userName of the to be created user
	 * @return {string} generated userId of the user
	 */
	createAndAddUserToRoom(roomKey, userName) {
		const room = this.rooms[roomKey]
		if (room === undefined) {
			throw new NonExistingRoomException()
		}

		let tmpUser = new User(userName, "normal")
		room.addUser(tmpUser)

		return tmpUser.getId()
	}

	/**
	 * deletes a user from the room he is in and returns the username
	 * @param roomKey of the room which the user is disconnecting from
	 * @param userId of the disconnecting user, needed to identify the user
	 * @return {string} username of the disconnecting user
	 */
	disconnectUserFromRoom(roomKey, userId) {
		const room = this.rooms[roomKey]
		let userName = ""

		for(let i = 0; i < room.users.length; i++) {
			if(room.users[i].getId() === userId) {
				userName = room.users[i].getName()
				room.users.splice(i, 1)
			}
		}

		return userName
	}


}

function NonExistingRoomException(message) {
	this.message = message;
	this.name = "NonExistingRoomException";
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