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

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    return res.status(401).send({errors: "please authenticate using valid token"})
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom')
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).send({errors: "Please authenticate using a valid token"})
    }
  }
}

// Get single product by ID
app.get('/product/:id', async (req, res) => {
  try {
    console.log("GET /product/:id called with id:", req.params.id);
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId });
    
    if (!product) {
      console.log("Product not found with id:", productId);
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    console.log("Product found:", product);
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

// Update product endpoint
app.post('/updateproduct', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        image: req.body.image // Include image update
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    res.json({
      success: true,
      message: "Product updated successfully",
      product: product
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});

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
    name:req.body.username,
    email:req.body.email,
     password:req.body.password,
      cartData:cart,
      date: Date.now()
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



// Order Schema - make sure it's correct
// Order Schema - updated with orderId field
const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: function() {
      return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  items: [{
    productId: Number,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);


// Get user orders
app.get('/orders', fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({userId: req.user.id}).sort({date: -1});
    res.json({success: true, orders});
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({success: false, message: "Server error"});
  }
});

//creating end point for new collection dta
app.get('/newcollections', async ( req,res)=>{
let products = await Product.find({});
let newCollection = products.slice(1).slice(-8);
console.log("New collection fetched")
res.send(newCollection);
})

//creating end point for popular in women 
app.get('/popularinwomen', async ( req,res)=>{
let products = await Product.find({category:"women"});
let PopularInWomen = products.slice(0,4);
console.log("popular in women fetched fetched")
res.send(PopularInWomen);
})

//creating end point for add to cart
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({_id: req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
  res.json({ success: true, message: "Added to cart" }); // Return JSON instead of plain text
});

//creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({_id: req.user.id});
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
  }
  res.json({ success: true, message: "Removed from cart" }); // Return JSON instead of plain text
});


//creating endpoint to get cart data
app.post('/getcart' , fetchUser,async ( req,res)=>{
  console.log("getcart" )
  let userData = await Users.findOne({_id:req.user.id})
res.json(userData.cartData)
})

// Checkout endpoint
// Checkout endpoint - updated with better error handling
app.post('/checkout', fetchUser, async (req, res) => {
  try {
    console.log("Checkout request received:", req.body);
    
    const user = await Users.findOne({_id: req.user.id});
    if (!user) {
      console.log("User not found with ID:", req.user.id);
      return res.status(400).json({success: false, errors: "User not found"});
    }

    // Get cart items with details
    const cartItems = user.cartData;
    console.log("User cart data:", cartItems);
    
    const productIds = Object.keys(cartItems).filter(id => cartItems[id] > 0);
    console.log("Product IDs with quantity > 0:", productIds);
    
    if (productIds.length === 0) {
      return res.status(400).json({success: false, message: "Cart is empty"});
    }
    
    // Get product details for items in cart
    const products = await Product.find({ 
      id: { $in: productIds.map(id => parseInt(id)) } 
    });
    console.log("Found products:", products);
    
    // Prepare order items
    const orderItems = products.map(product => ({
      productId: product.id,
      name: product.name,
      price: product.new_price,
      quantity: cartItems[product.id],
      image: product.image
    }));
    
    // Calculate total amount
    const amount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log("Total amount:", amount);
    
    // Validate address
    if (!req.body.address || Object.keys(req.body.address).length === 0) {
      return res.status(400).json({success: false, message: "Address is required"});
    }
    
    // Create new order
    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      amount: amount,
      address: req.body.address,
    });
    
    await order.save();
    console.log("Order saved:", order);
    
    // Clear user's cart after successful order
    let emptyCart = {};
    for (let i = 0; i < 300; i++) {
      emptyCart[i] = 0;
    }
    user.cartData = emptyCart;
    await user.save();
    console.log("User cart cleared");
    
    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id
    });
  } catch (error) {
    console.error("Checkout error details:", error);
    res.status(500).json({
      success: false, 
      message: "Server error during checkout",
      error: error.message
    });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on " + port);
  } else {
    console.log("error" + error);
  }
});