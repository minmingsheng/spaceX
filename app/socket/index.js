'use strict';
const crypto = require('crypto');
module.exports = (io, app)=>{
		let	allrooms = app.locals.chatrooms;
		let roomListusers = app.locals.roomListusers;
		let sid = app.locals.sid;
		let posObj = app.locals.posObj;

		console.log("allrooms: ", app.locals);
		io.of('/roomList').on('connection', socket=>{
			console.log("successfully connect to client : roomLists");
			socket.on("getAllRooms", ()=>{
				socket.emit("sendAllRooms", JSON.stringify(allrooms));
			})
			socket.on("createRoom", (roomName)=>{
				console.log("roomName: ", roomName);
				console.log("checkRoom:", findRoomByName(allrooms, roomName));
				var RoomExist = findRoomByName(allrooms, roomName);
				if(!RoomExist){
					console.log("the room not yet exist");
					allrooms.push({
						room:roomName,
						roomId:randomHex(),
						users:[]
					})
				}else{
					console.log("alreay be there");
					socket.emit("theSame","have already exist");
				}

				/*emit an pudte list to creator*/
				console.log("allrooms: ", allrooms);
				socket.emit("sendAllRooms", JSON.stringify(allrooms));
				socket.broadcast.emit("sendAllRooms", JSON.stringify(allrooms));
			})
			socket.on("join", (data)=>{
				addUserToRoomList(data, socket, roomListusers);
				console.log("roomListusers: ", roomListusers);
				socket.emit("updateUserList", JSON.stringify(roomListusers));
				socket.broadcast.to("11111aaaaa").emit("updateUserList", JSON.stringify(roomListusers));

				socket.broadcast.to("11111aaaaa").emit("getRoomListUsersNum", roomListusers.length);
				socket.emit("getRoomListUsersNum", roomListusers.length);

				console.log("roomListUsersNum:, ", roomListusers.length);
			})
			socket.on("disconnect", ()=>{
				console.log("1 user disconnect");

				spliceLeaveUser(socket, roomListusers);
				socket.broadcast.to("11111aaaaa").emit("getRoomListUsersNum", roomListusers.length);
				socket.emit("getRoomListUsersNum", roomListusers.length);


				socket.emit("updateUserList", JSON.stringify(roomListusers));
				socket.broadcast.to("11111aaaaa").emit("updateUserList", JSON.stringify(roomListusers));

				console.log("roomListUsersNum:, ", roomListusers.length);
			})
			socket.on("sendMessage", (sms)=>{
				console.log("sms:", sms);
				socket.broadcast.to("11111aaaaa").emit("broadcastSms", JSON.stringify(sms));
				socket.emit("broadcastSms", JSON.stringify(sms));
			});

		})/*of('/roomList')*/
		io.of('/room').on('connection', socket=>{
			console.log("successfully connect with playroom");
			socket.on("join", (data)=>{
				let addUsertoPlayRoom = (allrooms, socket, data)=>{
					let getroom = getRoom(allrooms, data.roomId);
					let exist;
					if(getroom){
						for (var i = 0; i < getroom.users.length; i++) {
							if(getroom.users[i].userId === data.userId){
								exist = true;
							}
						};
						if(!exist){
							getroom.users.push({
								roomId: data.roomId,
								socketId: socket.id,
								userPic: data.userPic,
								userName: data.userName,
								userId: data.userId,
							})
							getroom.socketId = socket.id;
						}

					}
					socket.join(data.roomId);
					console.log("getRoom(allrooms, data.roomId): ", getroom);
					return getroom
				}
				let PlayroomUserList = addUsertoPlayRoom(allrooms, socket, data).users;
				console.log("PlayroomUserList: ", PlayroomUserList);

				socket.broadcast.to(data.roomId).emit("PlayroomUserList", JSON.stringify(PlayroomUserList));
				socket.emit("PlayroomUserList", JSON.stringify(PlayroomUserList));
			})

			socket.on("sendPlaySms", (data)=>{
				console.log(data);
				socket.broadcast.to(data.roomId).emit("newSMS", data);
				socket.emit("newSMS", data);
			});

			socket.on("shake", (data)=>{
				console.log(data);
				socket.broadcast.to(data.roomId).emit("shakePermission", data);
				socket.emit("shakePermission", data);
			})

			socket.on("disconnect", ()=>{
				console.log("1 user disconnect from room");
				let removeUserFromRoom =  (allrooms, socket)=>{
					let getRoom = (allrooms, roomId)=>{
						return allrooms.find((el, index, array)=>{
							if(el.socketId === roomId){
								return true
							}else{
								return false
							}
						})
					}
					let room = getRoom(allrooms, socket.id);
					console.log("when leave:", room);
					if(room){
						let t;
						for (var i = 0; i < room.users.length; i++) {
							if(room.users[i].socketId == socket.id){
								t = i;
							}
						};
						if(t != undefined){
							socket.leave(room.roomID);
							room.users.splice(t,1)
						}
						console.log("when leave t : ", room.users);
						socket.broadcast.to(room.roomId).emit("PlayroomUserList", JSON.stringify(room.users));
						socket.to(room.roomId).emit("PlayroomUserList", JSON.stringify(room.users));
						socket.emit("PlayroomUserList", JSON.stringify(room.users));
					}

				}
					// // let num = findUser(room, socket);
					// console.log("when liear num: ", num);
				removeUserFromRoom(allrooms, socket)
	
 	
			})
		});

		require('./login.js')(io, app);

			
	
		io.of('/play').on('connection', socket=>{
			console.log("connect with play");
		});


}


// ****************************************************************************
// *                                  helper                                  *
// ****************************************************************************

let findRoomByName = (allrooms, room)=>{
	let findRoom = allrooms.findIndex((el, index, array)=>{
		if(el.room === room){
			return true;
		}else{
			return false;
		}
	})
	return findRoom > -1? true: false;
	// console.log(findRoom);
}

let randomHex = ()=>{
	return crypto.randomBytes(24).toString('hex');
}

let addUserToRoomList=(data, socket, roomListusers)=>{
	// console.log(data);
	var uniqueUserId = socket.request.session.passport.user;
	// console.log("uniqueUserId: ",uniqueUserId);
	// console.log("socketID: ",socket.id);
	for (var i = 0; i < roomListusers.length; i++) {
		if(roomListusers[i].luserId===uniqueUserId){
			return
		}
	};
	roomListusers.push({
		socketId: socket.id,
		luserId: uniqueUserId,
		luserName: data.userName,
		luserPic: data.userPic
	})
	socket.join("11111aaaaa");

};

let spliceLeaveUser=(socket, roomListusers)=>{
	let a;
	for (var i = 0; i < roomListusers.length; i++) {
		if(roomListusers[i].socketId === socket.id){
			a = i;
		}
	};
	if(a == undefined){
		return
	}else{
		roomListusers.splice(a,1);
		// console.log("after splice roomListusers", roomListusers);
	}

}

let findSid = (sid,socket)=>{

	if(sid.indexOf(socket.id)===-1){
		sid.push(socket.id)
	}else{
		return
	};
		// console.log(sid);
	// console.log(socket.id);
	
}

let getRoom = (allrooms, roomId)=>{
	return allrooms.find((el, index, array)=>{
		if(el.roomId === roomId){
			return true
		}else{
			return false
		}
	})
}