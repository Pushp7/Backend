const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res)=>{
    res.send("Hello world")
})
app.get("/create", async(req, res)=>{
    let user = await userModel.create({
        username: "Nikki",
        email: "nikki@gmail.com",
        age: 20
    })
    res.send(user)
})
app.get("/post/create", async(req, res)=>{
    let post = await postModel.create({
        postdata: "Hello bhai log",
        user: "6638722ef61eb03b75a9e78b"
    })

    let user = await userModel.findOne({_id: "6638722ef61eb03b75a9e78b"})
    user.posts.push(post._id)
    await user.save()

    res.send({post, user})
})

app.listen(3000)