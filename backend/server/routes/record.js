const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { ObjectID, ObjectId, mongo } = require("mongodb");
const {PythonShell} = require ('python-shell');
var EventEmitter = require("events").EventEmitter;
var messageBus = new EventEmitter();
messageBus.setMaxListeners(20);
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

recordRoutes.post('/api.cusRegister', async (req, res, next) => {
  try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      var newCus = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
      }    
      
      const dbConnect = dbo.getDb();
      dbConnect
      .collection("customer")
      .insertOne(newCus, (err, result) => {
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
    .find({}).sort({"_id": -1})
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


recordRoutes.put("/updateStatus/:id", async (req, res, next) => {
  try{
    const {id} = req.params
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

recordRoutes.put("/api.changeProgressingStatus/", async (req, res, next) => {
  try{
    let {id_list} = req.body
    let object_id_list = id_list.map(i => ObjectId(i))
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .updateMany({ "_id": { "$in": object_id_list }}, {$set: {"status": "Progressing"}}, (err, doc) => {
          console.log(doc)
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.put("/api.changeDeliveringStatus/", async (req, res, next) => {
  try{
    let {id_list} = req.body
    let object_id_list = id_list.map(i => ObjectId(i))
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .updateMany({ "_id": { "$in": object_id_list }}, {$set: {"status": "Delivering"}}, (err, doc) => {
          console.log(doc)
          res.json(doc)
        })
  } catch{
        console.log("hi")
        res.status(500).send();
  }
});

recordRoutes.put("/api.changeCompletedStatus/", async (req, res, next) => {
  try{
    let {id_list} = req.body
    let object_id_list = id_list.map(i => ObjectId(i))
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .updateMany({ "_id": { "$in": object_id_list }}, {$set: {"status": "Completed"}}, (err, doc) => {
          console.log(doc)
          res.json(doc)
        })
  } catch{
        console.log("hi")
        res.status(500).send();
  }
});

recordRoutes.get("/solving-route", async (req, res, next) => {
  await PythonShell.run('optimize_route.py', null,  function (err, result) {
    if (err) console.log(err)
    console.log(result)
    let drop = result.shift()
    drop_nodes = drop.split(':')[1].split(' ').map(x => parseInt(x))
    drop_nodes.shift()
    // res.send(result)
    doc = result.map(x => x.split(',').map(y => parseInt(y))).filter(x => x.length != 2)
    doc.map(x => x.pop())
    doc.map(x => x.shift())
    res.send({route_legs: doc, drop_nodes: drop_nodes})
  });

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


//set up mongoose
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var fs = require('fs');
var path = require('path');
require('dotenv/config');

//connect db
mongoose.connect("mongodb+srv://admin:Thientai1997@@cluster0.hofjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }, err => {
      console.log('connected')
  });

//set up multer
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

//load mongoose model for img
var imgModel = require('../models/model');

recordRoutes.put("/addProduct", async (req, res, next) => {
  try{
    var newProduct = req.body.productForm
    const dbConnect = dbo.getDb();
        dbConnect
        .collection("product")
        .insertOne(newProduct, (err, result) => {
            res.json(result)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get('/getOrderByUsername/:username', async function (req, res) {
  const dbConnect = dbo.getDb();
  let username = req.params.username;
  dbConnect
    .collection("order")
    .find({username:username}).limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.post('/cusLogin', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  
  const dbConnect = dbo.getDb();
  dbConnect
  .collection("customer")
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
               customer: {
                    fullname: body[0].fullname,
                    username: body[0].username,
                    email: body[0].email,
                    phone: body[0].phone,
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

recordRoutes.delete('/deleteProductById/:id', async function (req, res, next) {
  try{
    const {id} = req.params
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("product")
        .deleteOne({_id: ObjectId(id)}, (err, result) => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
})

recordRoutes.get('/api.getProductById/:id', async (req, res, next) => {
  const {id} = req.params
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("product")
    .findOne({_id: ObjectId(id)} , (err, result) => {
      res.send(result)
    })
})

recordRoutes.put('/api.updateProduct/:id', async (req, res, next) => {
  try{
    const {id} = req.params
    let updateProduct = req.body
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("product")
        .update({_id: ObjectId(id)}, {$set: updateProduct}, (err, doc) => {
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
})


recordRoutes.get('/api.checkVehicleAvailable', async (req, res, next) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("vehicle")
    .find({"status": "available"})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
})

recordRoutes.delete('/api.deleteOrderById/:id', async function (req, res, next) {
  try{
    const {id} = req.params
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("order")
        .deleteOne({_id: ObjectId(id)}, (err, result) => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
})

recordRoutes.put("/order", async (req, res, next) => {
  try{
    var newOrder = req.body.formOrder
    const dbConnect = dbo.getDb();
        dbConnect
        .collection("order")
        .insertOne(newOrder, (err, result) => {
            res.json(result);
            req.io.sockets.emit('Server-send-data', newOrder)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.put('/api.vehicleToDelivery/:id', async (req, res, next) => {
  try{
    const {time}= req.body
    const {id} = req.params
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("vehicle")
        .update({_id: ObjectId(id)}, {$set: {timeBackToDepot: time, status: "unavailable"}},(err, doc) => {
          res.json(doc)
          req.io.sockets.emit('Server-update-time-delivery', time)
        })
  } catch{
        res.status(500).send();
  }
})

recordRoutes.put('/api.vehicleBackToDepot', async (req, res, next) => {
  try{
    const {time} = req.body
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("vehicle")
        .updateMany({timeBackToDepot: time}, {$set: {timeBackToDepot: 0, status: "available"}},(err, doc) => {
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
})

recordRoutes.get('/api.timeMinToDepot', async (req, res, next) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("vehicle")
    .find({"status": "unavailable"})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error send time min to depot!");
     } else {
       if (result.length != 0){
         res.json(Math.min(...result.map(x=> x.timeBackToDepot)));
       } else {
          res.json(0)
       }
      }
    });
})

recordRoutes.get('/api.vehicle', async (req, res, next) => {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("vehicle")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching vehicle!");
     } else {
        res.json(result);
      }
    });
})

module.exports = recordRoutes;
