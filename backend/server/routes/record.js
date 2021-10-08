const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
recordRoutes.post('/register', async (req, res, next) => {
  try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      var newUser = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
      }    
      
      const dbConnect = dbo.getDb();
      dbConnect
      .collection("user")
      .insertOne(newUser, (err, result) => {
        res.json(result)
      })
  }catch{
      res.status(500).send();
  }
})
recordRoutes.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("user")
  .find({username: username})
  .toArray((err, body) => {
    if(body.length > 0) {
      bcrypt.compare(
        password,
        body[0].password,
        (err, result) => {
          if(result){
            const accessToken = jwt.sign({
                cusId : body[0]._id,
                email: body[0].email
            }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h"
            }
            )
            res.status(200).send({
               user: {
                    name: body[0].name,
                    username: body[0].username,
                    email: body[0].email,
                    phone: body[0].phone,
                    role: body[0].role
               },
               accessToken : accessToken
           })
        }
        else{
            res.status(403).send({message : "Mật khẩu không chính xác"});
        }
        }
      )
    } else{
      res.status(404).send({message : "Tài khoản không tồn tại! "})
    }
  })
})

recordRoutes.get('/order', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("order")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });

});

recordRoutes.get('/user-list', async (req, res) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("user")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
})

recordRoutes.route("/customer").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("customer")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.put("/order", async (req, res, next) => {
  try{
    var newOrder = req.body.formOrder
    
    const dbConnect = dbo.getDb();
        dbConnect
        .collection("order")
        .insertOne(newOrder, (err, result) => {
            res.json(result)
        })
  } catch{
        res.status(500).send();
  }
});


// This section will help you update a record by id.
recordRoutes.route("/listings/updateLike").post(function (req, res) {
  // Update likes
});

// This section will help you delete a record
recordRoutes.route("/listings/delete").delete((req, res) => {
  // Delete documents
});

module.exports = recordRoutes;
