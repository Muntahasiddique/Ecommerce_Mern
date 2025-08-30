const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { type } = require("os");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://muntahamirza890:dbMuntahaPass@mydb.bcxy0.mongodb.net/e-commerce"
);

// Api creation

app.get("/", (req, res) => {
  res.send("express running");
});

// image storage engine
const storage = multer.diskStorage({
  destination: "./Upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const Upload = multer({ storage: storage });
//Creating upload endpoint for images
app.use("/images", express.static("Upload/images"));
app.post("/Upload", Upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//schema for creating products
const Product = mongoose.model("Product" , {
    id:{
        type:Number,
        required : true,
    },
    name:{
        type :String,
        required:true,
    }
    ,
    image:{
        type :String,
        required:true,
    },
    category:{
        type :String,
        required:true,
    },
    new_price:{
        type :Number,
        required:true,
    },
    old_price:{
        type :Number,
        required:true,
    },
    date:{
        type :Date,
       default:Date.now,
    },
    avilable:{
        type :Boolean,
        default:true,
    },
})
app.post('/addproduct' , async (req,res)=>{
    let products = await Product.find({})
let id;
if(products.length > 0){
    let last_product_array = products.slice(-1);
    let las_product = last_product_array[0];
    id = las_product.id +1;
}

else{
    id = 1;
}

const product = new Product({
    id:id,
    name:req.body.name,
    image:req.body.image,
    category:req.body.category,
    new_price:req.body.new_price,
    old_price:req.body.old_price

})
console.log(product)
await product.save();
console.log("saved")
res.json({
    success:true,
    name:req.body.name,
})
})

// creating API FOR DELETING PRODUCTS
 app.post('/removeproduct' , async (req , res)=>{
    await Product.findOneAndDelete({id: req.body.id})
    console.log("removed")
    res.json({success:true,
        name:req.body.name
    })
 })


// creating API FOR getting all PRODUCTS
app.get('/allproducts' , async(req , res)=>{
    let products = await Product.find({});
    console.log("All fetched product")
    res.send(products)
})

//user Schema 
const Users = mongoose.model('Users',{
  name:{
    type:String,
  },
   email:{
      type:String,
      unique:true,
     
    },
     password:{
        type:String
      },
      cartData:{
        type:Object,
      },
      date:{
        type:Date,
        default:Date.now,
      }
})

//End point for Registering user
app.post('/signup',async (req,res)=>{
  let check = await Users.findOne({email:req.body.email})
  if (check) {
    return res.status(400).json({success:false,errors:"exiting User Found with same email id"})
  }
  let cart ={}
  for (let i = 0; i < 300; i++) {
  cart[i] =0;
    
  }
  const user = new Users({
    name:req.body.name,
    email:req.body.email,
     password:req.body.password,
      cartData:req.body.cart,
  })
  await user.save();

  //jwt authentaication
  const data = {
    user:{
      id : user.id
    }
  }
  const token = jwt.sign(data,'secret_ecom');
  res.json({success:true,token})
})

//endpoint for user login
app.post('/login' , async (req , res)=>{
let user = await Users.findOne({
  email:req.body.email
})
if(user){
  const passCompare = req.body.password === user.password;
  if(passCompare){
    const data = {
      user:{
        id:user.id
      }
    }
    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
  }
  else{
    res.json({success:false,errors:"Wrong password"})
  }
}
else{
  res.json({
    success:false,errors:"Wrong email"
  })
}
})

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on " + port);
  } else {
    console.log("error" + error);
  }
});
