const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

require("dotenv").config();

const UsersModel = require("./models/Users.js");
const DoctorsModel = require("./models/DoctorSchema.js");

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
  
//delete Users by id
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

let doctors = [];

//get All Doctors
app.get("/Doctors", async (req, res)=>{
  try {
    const DoctorsList = await DoctorsModel.find();
    doctors = DoctorsList;
    res.json(DoctorsList);
  }catch (error){
    res.status(500).json({message: `Error fetching Doctors: ${error}`});
  }
})

//Add Doctor

app.post("/Doctors", async (req, res)=>{
  console.log("Received data:", req.body);
  try{
    const {name, specialization, days, availability} = req.body;
    const AddDoctor = new DoctorsModel({name: name, specialization: specialization, days: days, availability: availability});
    await AddDoctor.save();
    doctors = [...doctors, AddDoctor];
    res.json(AddDoctor);
  }catch(error){
    console.error("Error saving user:", error);
    if (error.code === 11000){
        return res.status(400).json({ message: "Name: No duplicate names" });
    } 
    res.status(500).json({message: `Error creating user: ${error}`});
  }
})
//delete Doctors

//authenticate
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

    if (isMatch){
      res.json({ success: true, message: "Authentication successful" })
    }else{
      res.json({success: false, message:"Authentication failed"})
      const response = hashPassword(password);
      console.log(`${response}, ${hashedPassword}`);
    }

  }catch(err){
    console.error("Error authenticating user",err );
  }
})

//TODO make app.post server request that verifies if logged in credentials are a match to any on mongo database

//express paths end

async function hashPassword(password){
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);

}



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));


// in laptop hit ctrl fn break
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});