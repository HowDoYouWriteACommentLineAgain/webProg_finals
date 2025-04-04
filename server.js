  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");

  require("dotenv").config();

  const UsersModel = require("./models/Users.js");
  const DoctorsModel = require("./models/DoctorSchema.js");

  const app = express();
  app.use(express.json());
  app.use(cors());


  mongoose.connect(process.env.MONGO_URI /*,{
      // useNewUrlParser:true,
      // useUnifiedTopology:true,
  }*/)
  .then(()=>console.log("MongoDB Connected"))
  .catch((err)=> console.log(err));

  //middleware authentication
  const requireAuth = (req, res, next) =>{
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer ")){
      return res.status(404).json({error:"Unauthorized"});
    }

    const token = header.split(" ")[1];

    if(!token) return res.status(401).json({error: "Unauthorized"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
      if(err){
        console.error('Error: ', err.message);
        return res.status(401).json({error: "Invalid Token"});
      }else{
        console.log('auth Passed');
        req.user = decodedToken;
        next();
      }
    })

  }


  //express paths start

  //IsUser Authorized?

  app.get("/AccessProtected", requireAuth, async (req,res)=>{
    res.status(200).json({message: 'User Authorized to access protected route'});
  })

  app.get("/checkTokenValidity", requireAuth, async(req, res)=>{
    res.status(200).json({message: 'userToken checked and verified'});
  })

  //creates user
  app.post("/Users", requireAuth ,async (req, res) => {
      console.log("Received data:", req.body); // Debugging line
      try{
          const {username, password} = req.body;
          const hashed = await hashPassword(password);
          const AddUser = new UsersModel({username, password: hashed});
          //or if without destructuring UserConent: const AddUser = new UsersModel(req.body.UserContent);
          await AddUser.save();
          return res.json(AddUser);
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
        return res.json(UsersList);
      } catch (error) {
        return res.status(500).json({ message: `Error fetching Users: ${error}` });
      }
  });
    
  //delete Users by id
  app.delete("/Users/:id", requireAuth, async (req,res)=>{
    try{
        const {id} = req.params;
        if(!id) return res.status(404).json({message: "id not found"});
        await UsersModel.findByIdAndDelete(id);
        
        // Respond with a success message
        res.status(200).json({ message: "User deleted successfully" });
    }catch(error){
        res.status(500).json({message:"Error Deleting User"});
    }
  })

  //authenticate user login
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
        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET, {expiresIn: '5m'});
        return res.json({ success: true, message: "Authentication successful" , token: token});
      }else{
        return res.json({success: false, message:"Authentication failed"})
        // const response = hashPassword(password);
        // console.log(`${response}, ${hashedPassword}`);
      }

    }catch(err){
      console.error("Error authenticating user",err );
    }
  });


  //get All Doctors
  app.get("/Doctors", async (req, res)=>{
    try {
      const DoctorsList = await DoctorsModel.find();
      return res.json(DoctorsList);
    }catch (error){
      res.status(500).json({message: `Error fetching Doctors: ${error}`});
    }
  })

  //Add Doctor

  app.post("/Doctors", requireAuth ,async (req, res)=>{
    console.log("Received data:", req.body);
    try{
      const {name, specialization, days, availability} = req.body;
      const AddDoctor = new DoctorsModel({name: name, specialization: specialization, days: days, availability: availability});
      await AddDoctor.save();
      doctors = [...doctors, AddDoctor];
      return res.json(AddDoctor);
    }catch(error){
      console.error("Error saving user:", error);
      if (error.code === 11000){
          return res.status(400).json({ message: "Name: No duplicate names" });
      } 
      res.status(500).json({message: `Error creating user: ${error}`});
    }
  })
  //delete Doctors

  app.delete("/Doctors/:id", async (req,res)=>{
    try{
        const {id} = req.params;
        await DoctorsModel.findByIdAndDelete(id);
        
        // Respond with a success message
        res.status(200).json({ message: "Doctor info deleted successfully" });
    }catch(error){
        res.status(500).json({message:"Error Deleting Doctor info"});
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