'use strict';
const port = 1990;
const express = require('express');
const app = express();
const spaceApp = require('./app');
const passport = require('passport')



app.use(express.static("public"))


// ****************************************************************************
// *                                  session                                 *
// ****************************************************************************





app.set("view engine", "ejs");
app.use(spaceApp.session);

app.use("/", passport.initialize());
app.use("/", passport.session());


app.use("/", spaceApp.router);
app.listen(process.env.PORT || port, ()=>{
	console.log(`PORT: ${port}`);
})
