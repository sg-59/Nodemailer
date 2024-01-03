const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
const appRoute=require('./routes/Approuter')
dotenv.config()
app.use(cors())
mongoose.connect(process.env.Mongo_Url).then((data)=>{
    console.log('data base are connected');
})

app.use(express.json())

app.use('/api',appRoute)
  
app.listen(3000,()=>{
    console.log('port 3000 is connected');
})
