'use strict'
module.exports = (io,app,sid,socket)=>{
	var id = new Set();
	io.of('/login').on('connection', socket=>{
		console.log("successfully connect with login");
		socket.on("join", ()=>{
			console.log("joining");
			socket.emit("register", socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  );
			if(!id.has(socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  )){
				id.add(socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  )
			}
			console.log("sid: ", id.size);
			socket.join('110a')
			id.forEach((f)=>{
				console.log("id",f);
			})
			// socket.emit("countOdId", sid.length);
			socket.broadcast.to("110a").emit("countOdId", {
				ids:  Array.from(id)
			});
			socket.emit("countOdId", {
				ids:  Array.from(id)
			});
		});

		socket.on("mousemove", (data)=>{
			console.log("id: ", socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  );
			console.log("x: ", data.x);
			console.log("y: ", data.y);
			let send= ()=>{
				socket.emit("someOneMoving", {
					id: socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  ,
					x: data.x,
					y: data.y,
				});
			}
			socket.broadcast.to("110a").emit("someOneMoving", {
				id: socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  ,
				x: data.x,
				y: data.y,
			});
			setTimeout(send,100);
		})

		socket.on("disconnect", ()=>{
			if(id.has(socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  )){
				id.delete(socket.id.split("").splice(4,7).concat('A').join('').toLowerCase().replace("#", 'A')  )
			}
			socket.broadcast.to("110a").emit("countOdId", {
				ids:  Array.from(id)
			});
			socket.emit("countOdId", {
				ids:  Array.from(id)
			});
		})
	});
}
