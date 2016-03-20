'use strict'
const h = require('../helper');
const passport = require('passport');

module.exports = ()=>{
	let routes = {
		"get":{
			'/': (req, res, next)=>{
				res.render("login")
			},
			"/roomList":(req, res, next)=>{
				res.render("roomList")
 			},
 			'/logout': (req, res, next)=>{
 				// console.log(req);
 				req.logout();
 				res.redirect('/');
 			},
 			'/auth/facebook': passport.authenticate('facebook'),
 			"/auth/facebook/callback": passport.authenticate('facebook', {
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
				/*cwd: current work directory process*/
				res.status(404).sendFile(process.cwd()+"/views/404.html");
 		},

	}


	return h.route(routes);
}