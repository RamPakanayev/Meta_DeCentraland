const express =require("express")
const app = express()
const jsn= require('./Meta_DeCentraland_Plots.json')

app.get("/api",(req,res)=>{
    // res.json({ "users":["userOne, userTwo,userThree,user4"]})
    res.json({data:jsn})
})

app.listen(5001,()=>{console.log("Server started on port 5001");})