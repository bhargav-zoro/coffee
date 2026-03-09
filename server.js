const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

/* MONGODB CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/onepiececafe")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

/* SCHEMA */

const Order = mongoose.model("Order",{
customer:String,
mobile:String,
items:Array,
total:Number
})

/* API TO SAVE ORDER */

app.post("/order",async(req,res)=>{
const order = new Order(req.body)
await order.save()
res.send("Order saved to MongoDB")
})

/* START SERVER */

app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
})