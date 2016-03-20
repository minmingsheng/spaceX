'use strict';
const config = require('../config')
const passport =require('passport');
const db =require('../db');
const FacebookStrategy = require('passport-facebook').Strategy;
// ****************************************************************************
// *                                                                          *
// *                                 facebook    auth                             *
// ****************************************************************************


 module.exports = ()=>{
 	passport.serializeUser((user, done)=>{
 		done(null, user.id);
 	})

 	passport.deserializeUser((id, done)=>{
 		h.findById(id)
 			.then(user => done(null, user))
 			.catch(error => console.log("Error when deserializing the suer"))
 	})

 	passport.use(
 		new FacebookStrategy(config.fb, processAuth)
 	)
 }

 let processAuth = (accessToken, refreshToken, profile, done)=>{
 	  	let profileId = profile.id;
 	  	let profileName = profile.displayName;
 	  	let profilePic = profile.photos[0].value;
 	  	console.log("profileId: ", profileId);
 	  	console.log("profileName: ", profileName);
 	  	console.log("profilePic: ", profilePic);
 	  	 return done(null, profile);
 	  	// find(profileId)
 	  	// 	.then((result)=>{
 	  	// 		done(null, result);
 	  	// 		// if(result){
 	  	// 		// 	done(null, result);
 	  	// 		// 	console.log("from: result");
 	  	// 		// }else{
 	  	// 		// 	createUser(profileId,profileName,profilePic)

 	  	// 		// }
 	  	// 	})
 	  			
}

// ****************************************************************************
// *                                  helper                                  *
// ****************************************************************************

let find = (profileId)=>{
	return db.userModel.findOne({
		"profileId": profileId
	});
}
// console.log("find:",find("492664700944563"));
let createUser = (profileId,profileName, profilePic)=>{
	var newUser = new  db.userModel({
		profileId,
		profileName, 
		profilePic
	})
	newUser.save()
}
// createUser("112","1231312","adasdsa")