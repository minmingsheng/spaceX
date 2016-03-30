'use strict'
module.exports = (io,app,sid,socket)=>{
	let pl = {};
	let hpList = {};
	io.of('/multiPlay').on('connection', socket=>{

		console.log("succuessfully connect with multiPlay");
		socket.on("join", (data)=>{
			socket.join(data.roomId);
			// pl.push(data);
			let temp;
	
			if(pl[data.profileId]== undefined){
				temp = false
			}else{
				temp = true;
			}
			
			if(!temp){
				pl[data.profileId] = data;
			}
			console.log("joiing!!!", pl);
			
		})
		socket.on("playersList", (data)=>{
			socket.emit("playersList",pl)
		})
		// let radiantTeam = [];
		let direTeam = [];
		let RadiantTeam = [];
		socket.on("teamReq", (data)=>{
					console.log("data.profileId: ", data.profileId);
					console.log("data.pl: ", pl);

			if(data.team=="radiant"){
				let temp;
				for (var i = 0; i < RadiantTeam.length; i++) {
					if(RadiantTeam[i]==data.profileId){
						temp=true;
					}else{
						temp = false;
					}
				};
				if(!temp){
					RadiantTeam.push(data.profileId);
					socket.broadcast.to(data.roomId).emit("radiantRes", {
						id: data.profileId,
						info:pl[data.profileId]
					});
				}
			}else{

				let tempp;
				for (var i = 0; i < RadiantTeam.length; i++) {
					if(direTeam[i]==data.profileId){
						tempp=true;
					}else{
						tempp = false;
					}
				};
				if(!tempp){
					RadiantTeam.push(data.profileId);
					// console.log("asdasdasdad13132131!!!!: ", pl[socket.id]);

					socket.broadcast.to(data.roomId).emit("direRes",{
						id: data.profileId,
						info:pl[data.profileId]
					});
				}
				
				
			}
		})
		socket.on("reqCurrentPlayer", data=>{
			console.log("teams: ",data);
			var temp;
			// for (var i = 0; i < data.length; i++) {
			// 	for(prop in pl){
			// 			console.log("prop: ", prop);

			// 		if(prop == data[i]){
			// 			temp=true;
			// 		}else{
			// 			temp=false;
			// 		}
			// 	}
			// };
			console.log("temp: ", temp);

		});
		// socket.on("createPlayer", data=>{
		// 	console.log("createPlayer:", data);
		// 	socket.broadcast.to(data.roomId).emit("createOtherPlayer", data);
		// })
		

		socket.on("moveForward", data=>{
			 // console.log("moveForward", data);
			 socket.broadcast.to(data).emit("moveForward");
		})
		socket.on("notmoveForward", data=>{
			 // console.log("NOT!moveForward", data);
			 socket.broadcast.to(data).emit("notmoveForward");
		})
		socket.on("moveBackward", data=>{
			 // console.log("moveBackward", data);
			 socket.broadcast.to(data).emit("moveBackward");
		})
		socket.on("notmoveBackward", data=>{
			 // console.log("NOT!moveForward", data);
			 socket.broadcast.to(data).emit("notmoveBackward");
		})
		socket.on("moveLeft", data=>{
			 // console.log("moveLeft", data);
			 socket.broadcast.to(data).emit("moveLeft");
		})
		socket.on("notmoveLeft", data=>{
			 // console.log("NOT!moveLeft", data);
			 socket.broadcast.to(data).emit("notmoveLeft");
		})
		socket.on("moveRight", data=>{
			 // console.log("moveRight", data);
			 socket.broadcast.to(data).emit("moveRight");
		})
		socket.on("notmoveRight", data=>{
			 // console.log("NOT!moveRight", data);
			 socket.broadcast.to(data).emit("notmoveRight");
		})



		socket.on("otherCollid", data=>{
			 // console.log("otherCollid", data);
			 socket.broadcast.to(data.roomId).emit("collid", data.pos);
		})

		socket.on("askBarrier", data=>{
			let j = [
				{x:12,y:10, z:0},
				{x:3,y:10, z:0},
				{x:21,y:10, z:0}
				]
			// socket.broadcast.to(data).emit("barrier", j);
			socket.emit("barrier", j);
		})

		socket.on("barrierChange", data=>{
			// console.log(data);
			socket.broadcast.to(data.roomId).emit("barrierChange",data);
			// socket.emit("barrierChange",data);
		})

		socket.on("shoot" , (data)=>{
			// console.log(" is roomId: " + data.roomId);
			// console.log(" is profileId: " + data.profileId);
			// console.log(" is shootDirection: " + data.directionX);
			// console.log(" is shootDirection: " + data.directionY);
			// console.log(" is shootDirection: " + data.directionZ);
			socket.broadcast.to(data.roomId).emit("attacking", {
				profileId: data.profileId,
				x:data.directionX,
				y:data.directionY,
				z:data.directionZ
			})
		});

		socket.on("rotation" , (data)=>{
			// console.log(data.roomId);
			socket.broadcast.to(data.roomId).emit("rotation", {
				profileId: data.profileId,
				rotation: data.rotation
			})
		});

		socket.on("p" , (data)=>{
			// console.log(data.roomId);
			console.log(data);
			socket.broadcast.to(data.roomId).emit("pos", {
				profileId: data.profileId,
				position: data.pos
			})
		});

		socket.on("hp" , (data)=>{
			hpList[data.profileId] = [data.per, data.profileName, data.profilePic];
			console.log("HPdata", hpList);
			socket.broadcast.to(data.roomId).emit("otherHp", hpList);
			socket.emit("otherHp", hpList);
		});
		socket.on("disconnect", (data)=>{
			// console.log("leave!!!", data);
			if(pl[socket.id]== undefined){
				return
			}else{
				delete pl[socket.id];
			}


		})
	});
}
