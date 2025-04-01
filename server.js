const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const UsersModel = require("./models/Users.js");

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

app.post("/Users", async (req, res) => {
    console.log("Received data:", req.body); // Debugging line
    try{
        const {username, password} = req.body;
        const AddUser = new UsersModel({username, password});
        //or if without destructuring UserConent: const AddUser = new UsersModel(req.body.UserContent);
        await AddUser.save();
        res.json(AddUser);
    }catch(error){
        console.error("Error saving user:", error);
        if (error.code === 11000){
            return res.status(400).json({ message: "Username already exists." });
        } 
        res.status(500).json({message: `Error creating user${error}`});
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

//TODO make app.post server request that verifies if logged in credentials are a match to any on mongo database

//express paths end

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port: ${PORT}`));


// in laptop hit ctrl fn break
process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  process.exit(0);
});