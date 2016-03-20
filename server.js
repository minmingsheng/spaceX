'use strict';
const port = 1990;
const express = require('express');
const app = express();
const spaceApp = require('./app');



// ****************************************************************************
// *                                                                          *
// *                                 database                                 *
// ****************************************************************************






// let newChatUser = new require('./app/db').userModel({
// 				profileId: "1213123",
// 				profileName: "jason",
// 				profilePic: "nasdadaasd"
// 			})

// newChatUser.save((err, userModel)=>{
// 	if(err) return console.log(err)
// 	console.error(userModel);
// })

// userModel.findOne({profileId:"123134"}, (err, kk)=>{
// 	if(kk){
// 		console.log("exist");
// 	}else{
// 		console.log("no yet");
// 	}
// })



app.use(express.static("public"))

app.set("view engine", "ejs");
app.use("/", spaceApp.router)




app.listen(process.env.PORT || port, ()=>{
	console.log(`PORT: ${port}`);
})
