'use strict';
const config = require("../config");
const Mongoose = require("mongoose").connect("mongodb://minmingsheng:roooot@ds019829.mlab.com:19829/spacex");

/*check if it connect with db*/
Mongoose.connection.on('error', error=>{
	console.log("MongoDB Error:", error);
})
Mongoose.connection.once('open', function() {
  console.log("From: db folder: connected");
});
/*set the format to store*/
const Users = new Mongoose.Schema({
	profileId: String,
	profileName: String,
	profilePic: String
});
/*pass the format to db with the collection name*/
let userModel = Mongoose.model('users', Users);

module.exports = {
	Mongoose,
	userModel
}