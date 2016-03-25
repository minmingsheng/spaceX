'use strict'
const h = require('../helper');
const passport = require('passport');
const config = require('../config');


module.exports = ()=>{
	let r;
	let routes = {
		"get":{
			'/': (req, res, next)=>{
				res.render("login",{
					host: config.host
				})
			},
			"/roomList":[isAuthenticated,(req, res, next)=>{
				console.log("req.user!!!!:", req.user);
				res.render("roomList", {
					user: req.user,
					host: config.host
				})
 			}],
 			'/logout': (req, res, next)=>{
 				// console.log(req);
 				req.logout();
 				res.redirect('/');
 			},
 			'/room/:id': [isAuthenticated, (req, res, next)=>{
 				console.log("req.app.locals.chatrooms: ",req.app.locals.chatrooms);
 				console.log("req.params.id: ", req.params.id);

 				let getRoom  = findRoomById(req.app.locals.chatrooms, req.params.id);
 				// console.log("getRoom: ",getRoom);
 				console.log("req.query: ",req.query);
 				if(getRoom != undefined){
	 					console.log("bu zou!!!");
	 					res.render("room", {
							user:req.user,
							host: config.host,
							roomId: getRoom.roomId,
							roomName: getRoom.room,
							
	
	 				});

 				}else{
 					return next();
 				}


 					
 				

 			}],
 			"/room/:id/play": [isAuthenticated, (req, res, next)=>{
 				let getRoom  = findRoomById(req.app.locals.chatrooms, req.params.id);
 				console.log("play roomid: ", getRoom);
 					res.render("play", {
 						profilePic:req.user.profilePic,
 						profileName:req.user.profileName,
 						profileId:req.user.profileId,
						host: config.host,
						roomId: getRoom.roomId,
						roomName: getRoom.room,
 					})

 			}],
 			'/auth/facebook': passport.authenticate('facebook'),
 			"/auth/facebook/callback": passport.authenticate('facebook', {
 				successRedirect: '/roomList',
 				failureRedirect:'/'
 			}),
 			'/auth/twitter': passport.authenticate('twitter'),
 			"/auth/twitter/callback": passport.authenticate('twitter', {
 				successRedirect: '/roomList',
 				failureRedirect:'/'
 			}),

 			// "/auth/facebook/callback": (req, res, next)=>{
 			// 	res.redirect('/')
 			// }


		},
		"post":{

		},
		"NA":(req, res, next)=>{
				// res.status(404).sendFile(process.cwd()+"/views/404.html");
				res.render("fof", {
					host: config.host,
				})
 		},

	}


	return h.route(routes);
}

// ****************************************************************************
// *                                  helper                                  *
// ****************************************************************************
let isAuthenticated = (req, res, next)=>{
	if(req.isAuthenticated()){
		next()
	}else{
		res.redirect('/')
	}
}

let findRoomById = (allrooms, id)=>{
	for (var i = 0; i < allrooms.length; i++) {
		if(allrooms[i].roomId === id){
			return allrooms[i];
		}
	};
}