'use strict';
const express = require('express');
const app = express();
const spaceApp = require('./app') 
// const router = require('express').Router();
const port = 1990;

console.log(spaceApp);



app.use(express.static("public"))

app.set("view engine", "ejs");
app.use("/", spaceApp.router)




app.listen(process.env.PORT || port, ()=>{
	console.log(`PORT: ${port}`);
})
