const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { ObjectID, ObjectId, mongo } = require("mongodb");
const {PythonShell} = require ('python-shell');
// const upload = require("../middleware/upload")
const Grid = require('gridfs-stream')

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

//admin 

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

recordRoutes.put("/updateStatus/:id", async (req, res, next) => {
  try{
    let id = req.params.id
    let status = req.body.status
    
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("order")
        .update({_id: ObjectId(id)}, {$set: {"status": status == 'New' ? 'Progressing' : 'New'}}, (err, doc) => {
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get("/solving-route", async (req, res, next) => {
  PythonShell.run('optimize_route.py', null,  function (err, result) {
    if (err) throw err;
    doc = result.map(x => x.split(',').map(y => parseInt(y))).filter(x => x.length != 2)
    doc.map(x => x.pop())
    doc.map(x => x.shift())
    res.send({route_legs: doc})
    // const dbConnect = dbo.getDb();
    // dbConnect
    // .collection("delivery")
    // .insertOne({route_legs: doc}, (err, result) => {
    //     res.send(result)
    // })
  });
  
  
  
  // console.log(data)
  // console.log('alo', alo)
  
});

recordRoutes.get('/products', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("product")
    .find({}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});


// recordRoutes.post("/upload", upload.single("file"), (req, res) => {
//   if(req.file === undefined) return res.send("You must select a file!")
//   const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
//   return res.send(imgUrl)
// })

// let gfs = Grid(dbo.getDb(), mongo)
// gfs.collection("photos")

module.exports = recordRoutes;
