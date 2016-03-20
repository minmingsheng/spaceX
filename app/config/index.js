'use strict';
if(process.env.NODE_ENV==="production"){
	module.exports = {
		host: process.env.host || "",
		dbURI: process.env.dbURI,
		sessionSecret: process.env.seesionSecret,
		fb:{
			clientID: process.env.fbClientID,
			clientSecret: process.env.fbClientSecret,
			callbackURL: processs.env.host + "/auth/facebook/callback",
			profileFields:["id", "displayName", "photos"]
		},
		tw:{
			consumerKey: process.env.twClientID,
			consumerSecret: process.env.twClientSecret,
			callbackURL: processs.env.host + "/auth/twitter/callback",
			profileFields:["id", "displayName", "photos"]
		}

	}
}else{
	module.exports = require('./development.json')
}