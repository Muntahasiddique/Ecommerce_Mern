const port = 4000;
const express =  require("express")
const app = express();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://muntahamirza890:dbMuntahaPass@mydb.bcxy0.mongodb.net/e-commerce")

// Api creation

app.get("/",(req , res)=>{
    res.send("express running")
})



app.listen(port,(error)=>{
    if(!error){
        console.log("server running on " + port)
    }
    else{
        console.log("error"+error)
    }
})
