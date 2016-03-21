'use strict';
const crypto = require('crypto');
module.exports = (io, app)=>{
		let	allrooms = app.locals.chatrooms;
		let roomListusers =app.locals.roomListusers;


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
	console.log(findRoom);
}

let randomHex = ()=>{
	return crypto.randomBytes(24).toString('hex');
}

let addUserToRoomList=(data, socket, roomListusers)=>{
	console.log(data);
	var uniqueUserId = socket.request.session.passport.user;
	console.log("uniqueUserId: ",uniqueUserId);
	console.log("socketID: ",socket.id);
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
		console.log("after splice roomListusers", roomListusers);
	}

}
