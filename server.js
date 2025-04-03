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
        const {username, password} = req.body; //or if without destructuring UserConent: const AddUser = new UsersModel(req.body.UserContent);
        const hashed = await hashPassword(password);
        const AddUser = new UsersModel({username, password: hashed});
        
        await AddUser.save();

        const payload = {
          user: {id:AddUser.id}
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30 minutes'});
        res.json({user: AddUser.username, token: token});

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

//authenticate login
app.post("/Users/authenticate", async (req,res)=>{
  try{
    const foundUser = await UsersModel.findOne({username:req.body.username});


    if (!foundUser){
      console.log('User not found');
      res.status(404).json({message:"user not found"});
      return;
    }

    const hashedPassword = foundUser.password;
    const {password} = req.body;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if(!isMatch){
      const response = hashPassword(password);
      console.log(`${response}, ${hashedPassword}`);
      return res.json({success: false, message:"Authentication failed"});
    }

    const payload = {
      user: {id:foundUser.id}
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30 minutes'});
    res.json({ success: true, message: "Authentication successful", token: token});

  }catch(err){
    console.error("Error authenticating user",err );
  }
})

//authenticate jwt token

app.get('/verify',verifyToken, (req, res)=>{
  res.status(200).json({success: true, message: 'Authenticated acknowledged'})
})

//express paths end

async function hashPassword(password){
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);

}

const verifyToken = (req, res, next) =>{
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if(!token) return res.status(401).json({message: 'No Token, Access Denied'})
  try{
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
      if (err) return res.status(401).json({message: 'Token not valid'});

        req.UsersModel = decoded;
        next();
    });
  }catch(err){
    console.error('Something went wrong in veifing Token middleware');
    res.status(500).json({message: 'Server error'});
  }
}



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));


// in laptop hit ctrl fn break
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});