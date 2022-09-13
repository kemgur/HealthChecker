var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

// user registration //
router.post('/register', function (req, res, next) {
    console.log(req.body)
    let username = req.body.name
    let email = req.body.email
    let companyname = req.body.companyname
    //bcrypt 
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            
            let password = hash
            let query = "INSERT INTO user (user, email, company, password) VALUES(?, ?, ? ,?)"
            connection.query(query, [username, email, companyname, password], function (error, result) {
                console.log(error, result)
            })
        })
        .catch(err => {
            console.log(err)
        })

});

// user login // 
router.get('/login', function (req, res, next) {
    console.log(req.query)
    let email = req.query.email
    let query = "SELECT * FROM user WHERE email=?"
    connection.query(query, [email], function (error, result) {
        console.log(error, result)
        if(error){
            res.json('Error 400')
        }
        console.log(result.length)
        if(result.length > 0){
            let user = result[0]
            console.log(user.password)
            bcrypt.compare(req.query.password, user.password) //bcrypt password
            .then(result => {
                console.log(result)
                if (result)
                res.json({result}) 
                else res.json('Invalid Credentials')
            })
            .catch(err => {
                console.log(err)
            })
        } else{
            
            res.json('This email doesnt exist!')
        }
       
    })

});
let username = 'burak'
let password = '1235567'
// let query = "SELECT * FROM user WHERE user=? AND password=?;"                  //${} for SQL inj.
// let query = "INSERT INTO user (user, password) VALUES('burak', 'lina12312');"
// console.log(query)
// connection.query(query, [username, password], function (error, result) {
//     console.log(error, result)
// })

module.exports = router;