const express = require("express")
const app = express()

const userModel = require("./usermodel")

app.get("/", (req, res)=>{
    res.send("Hello world")
})
app.get("/create", async (req, res)=>{
    let createduser = await userModel.create({
        name: req.query.name,
        username: req.query.username,
        email: req.query.email
    })

    res.send(createduser)
})

app.get("/update", async (req, res)=>{
    const updatedUser = await userModel.findOneAndUpdate({username: "kesar123"}, {name: "Kesariya"}, {new: true})   //hardcoded values have been updated.
    res.send(updatedUser)
})

app.get("/read", async (req, res)=>{
    const allUsers = await userModel.find()     // find() always returns an array of objects/documents - here returned all users
    // const user = await userModel.find({name:"Pushp"})     // here find() returned only one user as it is asked in an array.
    // const user = await userModel.findOne({name:"Pushp"})     // findOne() returns only one document if available and without an array.
    res.send(allUsers)
})

app.get("/delete", async (req, res)=>{
    const deletedUser = await userModel.findOneAndDelete({name: "Saurabh"})
    res.send(deletedUser)
})

app.listen(3000)