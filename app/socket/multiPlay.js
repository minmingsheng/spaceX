'use strict'
module.exports = (io,app,sid,socket)=>{
	io.of('/multiPlay').on('connection', socket=>{

		let pl = [];
		console.log("succuessfully connect with multiPlay");
		socket.on("join", (data)=>{
			console.log("joiing!!!", data);
			socket.join(data.roomId);
			pl.push(data);
			
		})
		// let radiantTeam = [];
		let direTeam = [];
		// socket.on("teamReq", (data)=>{
		// 	console.log("joiing!!!", data);
		// 	socket.join(data.roomId);
		// 	if(data.team=="radiant"){
		// 		socket.broadcast.to(data.roomId).emit("radiantRes", data);
		// 		socket.emit("teamRes", data);
		// 	}else{
		// 		socket.broadcast.to(data.roomId).emit("direRes", data);
		// 		socket.emit("teamRes", data);
		// 	}
		// })
		socket.on("createPlayer", data=>{
			console.log("createPlayer:", data);
			socket.broadcast.to(data.roomId).emit("createOtherPlayer", data);
		})
		

		socket.on("moveForward", data=>{
			 console.log("moveForward", data);
			 socket.broadcast.to(data).emit("moveForward");
		})
		socket.on("notmoveForward", data=>{
			 console.log("NOT!moveForward", data);
			 socket.broadcast.to(data).emit("notmoveForward");
		})


		socket.on("disconnect", (data)=>{
			console.log("leave!!!", data);


		})
	});
}
