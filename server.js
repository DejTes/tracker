const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const trackerController = require('./controllers/classTracker');

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGODB, () => {
    console.log('The connection with mongodb is established at process.env.MONGODB');
})


const app = express();
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method')); 
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public")); 
app.get('/', (req, res)=>{
    res.redirect("/tracker")
} )
app.use('/tracker', trackerController);

// =======================
// Listener
// =======================



// mongoose.connect('mongodb://localhost:27017/tracker', () => {
//     console.log('The connection with mongodb is established');
// })


app.listen(3000, () => {
    console.log('listening...');
})
