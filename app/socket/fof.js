'use strict'
module.exports = (io,app,sid,socket)=>{
	let roomPlayerLists = new Set();
	io.of('/fof').on('connection', socket=>{
		console.log("sucessfully connect with fof");
		socket.on("join", data=>{
			if(!roomPlayerLists.has(socket.id)){
				roomPlayerLists.add(socket.id)
			}
			console.log(roomPlayerLists);
			socket.join("room12138");
			socket.broadcast.to("room12138").emit("playerList", {
				roomPlayerLists: Array.from(roomPlayerLists)
			})
			socket.emit("playerList", {
				roomPlayerLists: Array.from(roomPlayerLists)
			})
		})
		socket.on("disconnect", data=>{
			if(roomPlayerLists.has(socket.id)){
				roomPlayerLists.delete(socket.id)
			}

			socket.broadcast.to("room12138").emit("playerList", {
				roomPlayerLists: Array.from(roomPlayerLists)
			})
			socket.emit("playerList", {
				roomPlayerLists: Array.from(roomPlayerLists)
			})
		})
	});
}
