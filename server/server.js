require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const routes=require('./routes/todoRoutes')
const cors=require('cors')

const PORT=process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MONGO DB connected successfully!")).catch(err=>console.log("Error occured at MONGO DB connection",err))

app.use(cors({origin:"https://mern-todo-app-sage.vercel.app/",credentials:true}))
app.use(express.json())
app.use('/todos',routes)

app.listen(PORT,()=> {
    console.log(`Server started and running at ${PORT}`)
})