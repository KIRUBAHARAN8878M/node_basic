const express = require('express');
const cors = require("cors");
const app = express();
const mongodb = require('mongodb');
const dotenv = require('dotenv').config();
const mongoClient =mongodb.MongoClient;
const URL = process.env.DB;
const DB = "Zen_Class"
let users = [];

//middleware
app.use(express.json());
app.use(cors({
   orgin: 'http://localhost:3000'
}))

app.get("/users", async function (req, res) {
   // let qParms = req.query;
   // let reUser = [];
   // for (let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
   //    if (users[index]) {
   //       reUser.push(users[index]);
   //    }

   // }
   // res.json(reUser);


   try{    
   const connection = await mongoClient.connect(URL)  
   const db = connection.db(DB)   
   let reUser = await db.collection("users").find().toArray();   
   await connection.close();
   res.json(reUser);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }
})

app.post("/user", async function (req, res) {
   
try{
   // step 1: Create a connection between NodeJS and MongoDB
const connection = await mongoClient.connect(URL)
   // step 2: Select the DB
const db = connection.db(DB)
   // step 3: Select the Collection
   // step 4: Do the Operation(Create,Update,Edit,Delete)
await db.collection("users").insertOne(req.body)
   // step 5: Close the Connection
await connection.close()

res.json({message:"Data inserted"});

} catch(error){
   res.status(500).json({message:"something went wrong"});

}
// if any error throw error 

   // req.body.id = users.length + 1;
   // users.push(req.body);
   // res.json({ message: "User Created Successfully...." });
})

app.get("/user/:id",async function (req, res) {
   // let userId = req.params.id;
   // let user = users.find((item) => item.id == userId);
   // if (user) {
   //    res.json(user);
   // } else {
   //    res.json({ message: "User not found" });
   // }

   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("users").findOne({_id : mongodb.ObjectId(req.params.id)})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }


})

app.put("/user/:id", async function (req, res) {
   // let userId = req.params.id;
   // let userIndex = users.findIndex((item) => item.id == userId);
   // if (userIndex != -1) {
   //    Object.keys(req.body).forEach((item) => {
   //       users[userIndex][item] = req.body[item];
   //    });
   //    res.json({
   //       message: "Edited Done"
   //    });
   // } else {
   //    res.json({ message: "User not found" })
   // }

   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("users").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set:req.body})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }



})

app.delete("/user/:id", async function (req, res) {
   // let userId = req.params.id;
   // let userIndex = users.findIndex((item) => item.id == userId);
   // if (userIndex != -1) {
   //    users.splice(userIndex, 1);
   //    res.json({
   //       message: "User Deleted Done"
   //    });
   // } else {
   //    res.json({ message: "User not found" })
   // }

   try{
      // step 1: Create a connection between NodeJS and MongoDB
   const connection = await mongoClient.connect(URL)
      // step 2: Select the DB
   const db = connection.db(DB)
      // step 3: Select the Collection
      // step 4: Do the Operation(Create,Update,Edit,Delete)
   let user = await db.collection("users").findOneAndDelete({_id : mongodb.ObjectId(req.params.id)})
      // step 5: Close the Connection
   await connection.close()
   
   res.json(user);
   
   } catch(error){
      res.status(500).json({message:"something went wrong"});
   
   }


})

app.listen(process.env.PORT||3001);