'use strict'
module.exports = (io,app,sid,socket)=>{
	var id = new Set();
	io.of('/login').on('connection', socket=>{
		console.log("successfully connect with login");
		socket.on("join", ()=>{
			console.log("joining");
			socket.emit("register", socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  );
			if(!id.has(socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  )){
				id.add(socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  )
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
			console.log("id: ", socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  );
			console.log("x: ", data.x);
			console.log("y: ", data.y);
			socket.broadcast.to("110a").emit("someOneMoving", {
				id: socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  ,
				x: data.x,
				y: data.y,
			});
			socket.emit("someOneMoving", {
				id: socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  ,
				x: data.x,
				y: data.y,
			});
		})

		socket.on("disconnect", ()=>{
			if(id.has(socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  )){
				id.delete(socket.id.replace('/login#','').split("").splice(0,2,'A').join('')  )
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
