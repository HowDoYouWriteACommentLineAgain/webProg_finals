const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


require("dotenv").config();

const UsersModel = require("./models/Users.js");
const Users = require("./models/Users.js");

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI /*,{
    // useNewUrlParser:true,
    // useUnifiedParser:true,
}*/)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=> console.log(err));


//express paths start

//creates user
app.post("/Users", async (req, res) => {
    console.log("Received data:", req.body); // Debugging line
    try{
        const {username, password} = req.body;
        const hashed = await hashPassword(password);
        const AddUser = new UsersModel({username, password: hashed});
        //or if without destructuring UserConent: const AddUser = new UsersModel(req.body.UserContent);
        await AddUser.save();
        res.json(AddUser);
    }catch(error){
        console.error("Error saving user:", error);
        if (error.code === 11000){
            return res.status(400).json({ message: "Username already exists." });
        } 
        res.status(500).json({message: `Error creating user: ${error}`});
    }
});

//get all Users
app.get("/Users", async (req, res) => {
    try {
      const UsersList = await UsersModel.find();
      res.json(UsersList);
    } catch (error) {
      res.status(500).json({ message: `Error fetching Users: ${error}` });
    }
});
  
app.delete("/Users/:id", async (req,res)=>{
  try{
      const {id} = req.params;
      await UsersModel.findByIdAndDelete(id);
      
      // Respond with a success message
      res.status(200).json({ message: "User deleted successfully" });
  }catch(error){
      res.status(500).json({message:"Error Deleting User"});
  }
})

//authenticate
app.post("/login", async (req,res)=>{
  try{
    const foundUser = await UsersModel.findOne({username:req.body.username});
    const message = "Username or Password incorrect"

    if (!foundUser){
      console.log(message);
      res.status(404).json({message:message});
      return;
    }

    const hashedPassword = foundUser.password;
    const {password} = req.body;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch){
      res.json({success: false, message:"Authentication failed: "+message});
      const response = hashPassword(password);
      console.log(`${response}, ${hashedPassword}`);
    }
    
    const token = jwt.sign({username: foundUser.username}, 'my key', {expiresIn:'1hr'})
    res.json({ token, success: true, message: "Authentication successful" })

  }catch(err){
    console.error("Error authenticating user",err );
  }
})

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});


//express paths end

async function hashPassword(password){
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);

}

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));


// in laptop hit ctrl fn break
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});