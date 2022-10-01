const express = require('express');
const cors = require("cors");
const app = express();
const mongodb = require('mongodb');
const dotenv = require('dotenv').config();
const mongoClient =mongodb.MongoClient;
const URL = process.env.DB;
const DB = "Mongo"

// let users = [];


//middleware
app.use(express.json());
app.use(cors({
   orgin: 'http://localhost:3000'
}))

app.get("/getAllPizzas", async function (req, res) {
   try{    
   const connection = await mongoClient.connect(URL)  
   const db = connection.db(DB)   
   let reUser = await db.collection("pizzas").find().toArray();   
   await connection.close();
   res.json(reUser);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }
})

app.post("/addpizza", async function (req, res) {
   
try{
   // step 1: Create a connection between NodeJS and MongoDB
const connection = await mongoClient.connect(URL)
   // step 2: Select the DB
const db = connection.db(DB)
   // step 3: Select the Collection
   // step 4: Do the Operation(Create,Update,Edit,Delete)
await db.collection("pizzas").insertOne(req.body)
   // step 5: Close the Connection
await connection.close()

res.json({message:"Data inserted"});

} catch(error){
   res.status(500).json({message:"something went wrong"});

}

})

app.get("/getpizzabyid/:id",async function (req, res) {
   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("pizzas").findOne({_id : mongodb.ObjectId(req.params.id)})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }


})

app.put("/updatedpizza/:id", async function (req, res) {


   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("pizzas").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set:req.body})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }
})

app.delete("/deletepizza/:id", async function (req, res) {


   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("pizzas").findOneAndDelete({_id : mongodb.ObjectId(req.params.id)})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }


})
//user collection


 
 app.post("/register", async function (req, res) {
   
   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   await db.collection("User").insertOne(req.body)
      // step 5: Close the Connection
   await connection.close()
   
   res.json({message:"Data inserted"});
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }
   
   })



 app.post("/login", async function (req, res) {
   const { email, password } = req.body;
   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   await db.collection("User").find({ email, password })
   if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0].Id,
      };
      res.status(200).send(currentUser);
    } else {
      res.status(400).json({
        message: "Login Failed",
      });
    }
   
   // step 5: Close the Connection
  
      await connection.close()
   
   
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }
   
   })

app.listen(process.env.PORT||3001);