'use strict'
const h = require('../helper');

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
 			}

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