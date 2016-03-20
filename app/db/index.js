'use strict';
const config = require("../config");
const Mongoose = require("mongoose").connect("mongodb://minmingsheng:roooot@ds019829.mlab.com:19829/spacex");
Mongoose.connection.on('error', error=>{
	console.log("MongoDB Error:", error);
})
Mongoose.connection.once('open', function() {
  console.log("From: db folder: connected");
});
const Users = new Mongoose.Schema({
	profileId: String,
	profileName: String,
	profilePic: String
});
let userModel = Mongoose.model('users', Users);

module.exports = {
	Mongoose,
	userModel
}