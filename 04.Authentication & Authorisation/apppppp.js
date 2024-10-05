const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.get('/', (req, res) => {
    // bcrypt.compare("Pu729j@r", "$2b$10$95KAfGw.FhN1dDRTJuWEHuoO.mBfX8FaEzouND6QGbVQNsorRMzyG", function(err, result) {
    //     console.log(result);
    // });

    var token = jwt.sign({ email: 'fakenaamid@gmail.com' }, 'shhhhh');
    res.cookie('token', token)
    res.send("done")
})

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})