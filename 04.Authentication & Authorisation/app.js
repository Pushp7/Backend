const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const userModel = require('./models/user');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("register");
});

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    //now creating user model and also encrypting the password
    let saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {            
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,     // Storing hashed password in DB.
                age
            })

            // generating jsonwebtoken and and seting it as cookie and sending on client side
            let token = jwt.sign({email}, "secretkey");
            res.cookie('token', token);
            // res.send(createdUser);
            res.redirect("/login")
        });
    });
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({email: req.body.email})
    if(!user){
        return res.send("Something is wrong")
    }
    
    bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email: user.email}, "secretkey");
            res.cookie('token', token);
            res.send("you are logged in now..")
        }
        else
            res.send("Something is wrong")
        
    });
    
});

app.get('/logout', (req, res) => {
    res.cookie("token", "")
    res.redirect("/");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});