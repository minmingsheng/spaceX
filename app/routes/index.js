'use strict'
const h = require('../helper');
const passport = require('passport');

module.exports = ()=>{
	let routes = {
		"get":{
			'/': (req, res, next)=>{
				res.render("login")
			},
			"/roomList":[isAuthenticated,(req, res, next)=>{
				res.render("roomList")
 			}],
 			'/logout': (req, res, next)=>{
 				// console.log(req);
 				req.logout();
 				res.redirect('/');
 			},
 			'/room': [isAuthenticated, (req, res, next)=>{
 				req.isAuthenticated()
 				res.render("room")
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
				res.status(404).sendFile(process.cwd()+"/views/404.html");
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