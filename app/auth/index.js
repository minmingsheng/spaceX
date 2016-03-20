'use strict';
const config = require('../config')
const passport =require('passport');
const db =require('../db');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


 module.exports = ()=>{
 	passport.serializeUser((user, done)=>{
 		done(null, user.id);
 	})

 	passport.deserializeUser((id, done)=>{
 		findById(id)
 			.then(user => done(null, user))
 			.catch(error => console.log("Error when deserializing the suer"))
 	})

 	passport.use(
 		new FacebookStrategy(config.fb, processAuth)
 	)
 	passport.use(
 		new TwitterStrategy(config.tw, processAuth)
 	)
 }

 let processAuth = (accessToken, refreshToken, profile, done)=>{
 	  	find(profile.id)
 	  		.then((result)=>{
 	  			console.log(result);
 	  			if(result){
 	  				done(null, result);
 	  				console.log("from: result");
 	  			}else{
 	  				createUser(profile)
 	  					.then(newUser=> done(null, newUser))
 	  					.catch(err=> console.log("Create new user error"))
 	  			}
 	  		})
 	  			
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
let createUser = (profile)=>{
	return new Promise((resolve, reject)=>{
		let profileId = profile.id;
		let profileName = profile.displayName;
		let profilePic = profile.photos[0].value;

		var newUser = new db.userModel({
			profileId,
			profileName,
			profilePic
		})

		console.log(newUser);
		newUser.save((err, userModel)=>{
			if(err){
				reject(err)
			}else{
				resolve(userModel)
			}
		})
	})
}

let findById = id=>{
	console.log(id);
	return new Promise((resolve, reject)=>{
		db.userModel.findById(id, (error,  user)=>{
			// console.log("from h- findById: ", user);
			if(error){
				reject(error);
				console.log(error);
			}else{
				resolve(user);
				console.log(user);
			}
		})
	});
}