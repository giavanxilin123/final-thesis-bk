const express = require("express");
const dbo = require("../db/conn");
const recordRoutes = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const { ObjectID, ObjectId, mongo } = require("mongodb");
const {PythonShell} = require ('python-shell');
dotenv.config()

var axios = require('axios');
var CronJob = require('cron').CronJob;
let API_KEY='AIzaSyAkK1Nj9HWtb4R0crJISga3j9hq2aBC8lQ'


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

// let j = []
// let center = '10.7719937,106.7057951'

recordRoutes.put("/order", async (req, res, next) => {
  try{
    var newOrder = req.body.formOrder
    newOrder.date = new Date()
    const dbConnect = dbo.getDb();
    orderCollection = dbConnect.collection("order")
    // vehicleCollection = dbConnect.collection("vehicle")
      
        orderCollection
        .insertOne(newOrder, (err, result) => {
            res.json(result);
            req.io.sockets.emit('Server-send-data', newOrder)
            // var config = {
            //   method: 'get',
            //   url: `http://localhost:5000/api.orderAutoCollection`,
            //   headers: { }
            // };
            
            // axios(config)
            // .then(function (response) {
            //   let arr = response.data;
            //   console.log(arr)
            //   arr.map(x => {
            //     if(j[x.index] !== undefined) {
            //       j[x.index].stop()
            //     }
            //     var cron = ' * * *'
            //     cron = '0 ' + String(x.timeRunEngine % 60) + ' ' + String(Math.floor(x.timeRunEngine / 60)) + cron
            //     j[x.index] = new CronJob(cron, async function() {
            //       console.log('Time for work')
            //       let object_id_list = x.id_list.map(i => ObjectId(i))
            //       await orderCollection
            //       .updateMany({ "_id": { "$in": object_id_list }}, {$set: {"status": "Progressing"}})
            //       req.io.sockets.emit('Server-send-data', 'fetchOrder')
            //       axios.get(`http://localhost:5000/solving-route`)
            //       .then(res => {
            //         let legs = res.data.route_legs
            //         orderCollection.find({ "_id": { "$in": object_id_list }}).sort({"_id": -1})
            //         .toArray(async (err, result) => {
            //           let order = result
            //           let l = legs.map(x => x.map(y => order[y-1].location))
            //           let location_map = legs.map(x => x.map(y =>{return {location: order[y-1].location}}))
            //           location_map_string = l.map(x => x.map(y => String(y.lat) + ',' + String(y.lng))).map(z => z.join("|"))
            //           let orderId_list = legs.map(x => x.map(y => order[y-1]._id))
            //           for (const step in location_map_string) {
            //             await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${center}&destination=${center}&waypoints=${location_map_string[step]}&key=${API_KEY}`)
            //             .then(async (res) => {
            //               let text;
            //                 for (const i in res.data.routes[0].legs) {
            //                     text += `- POINT ${String.fromCharCode(65 + parseInt(i))}: ${res.data.routes[0].legs[i].start_address}`
            //                     for (const j in res.data.routes[0].legs[i].steps){
            //                         text += `${parseInt(j) + 1}. ${res.data.routes[0].legs[i].steps[j].html_instructions}`
            //                     }
            //                 }
            //                 text += `- POINT A: ${res.data.routes[0].legs[res.data.routes[0].legs.length - 1].end_address}`
            //                 text = text.split('<b>').join('')
            //                        .split('</b>').join('')
            //                        .split('<div style="font-size:0.9em">').join('')
            //                        .split('<div>').join('')
            //                        .split('&nbsp;').join('')
            //                        .split('</div>').join('')
            //                        .split('<wbr/>').join(' ')
            //                        .split('&amp').join('')
            //                        .split('undefined').join('')
            //               let time = res.data.routes[0].legs.map(x => x.duration.value).reduce((a, b) => a + b, 0)
            //               let d = new Date()
            //               await vehicleCollection
            //               .find({"status": "available"})
            //               .toArray(async (err, result) => {
            //                 await axios.put(`http://localhost:5000/api.vehicleToDelivery/${result[step]._id}`, 
            //                 {time: Math.ceil(time / 60)+ d.getHours() * 60 + d.getMinutes(),
            //                 orderId_list: orderId_list[step],
            //                 route: location_map})
            //                 await orderCollection
            //                 .updateMany({ "_id": { "$in": object_id_list }}, {$set: {"status": "Delivering"}})
            //                 req.io.sockets.emit('Server-send-data', 'fetchOrder')
            //                 let uri = `https://api.telegram.org/bot2132188523:AAHyWbw4hkfmThyBEJdfu5tBbaZ25kamQQY/sendMessage?chat_id=-683648998&text=${text}`
            //                 let encoded = encodeURI(uri);
            //                 console.log(encoded)
            //                 await axios.post(encoded)
            //               })  
            //             })
            //           }
            //         })
            //       })
            //     }, null, true, 'Asia/Ho_Chi_Minh');
            //     j[x.index].start();
            //   })
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.post('/api.register', async (req, res, next) => {
  try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      var newUser = {
        name: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        role: "admin"
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
                email: body[0].email,
                role: body[0].role
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
    .find({})
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
    .find({})
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
          res.json(doc)
        })
  } catch{
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
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get("/solving-route", async (req, res, next) => {
  await PythonShell.run('optimize_route.py', null,  function (err, result) {
    if (err) console.log(err)
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

recordRoutes.get('/api.getAllProducts', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("product")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.get('/api.getPopularProducts', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("product")
    .find({}).limit(4)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.get('/api.getProductByType/:type', async function (req, res) {
  const {type} = req.params
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("product")
    .find({type: type})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products!");
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
    .find({username:username})
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

recordRoutes.put('/api.vehicleToDelivery/:id', async (req, res, next) => {
  try{
    const {time} = req.body
    const {orderId_list} = req.body
    const {route} = req.body
    const {id} = req.params
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("vehicle")
        .update({_id: ObjectId(id)}, {$set: {timeBackToDepot: time, status: "unavailable", orderId_list : orderId_list, route: route}}, (err, doc) => {
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
        .updateMany({timeBackToDepot: time}, {$set: {timeBackToDepot: 0, status: "available", orderId_list: [], route: []} },(err, doc) => {
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

recordRoutes.get('/api.config', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("config")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.put('/api.config', async (req, res, next) => {
  try{
    const {duration} = req.body
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("config")
        .update({}, {$set: duration} ,(err, doc) => {
          res.json(doc)
        })
  } catch{
        res.status(500).send();
  }
})


recordRoutes.get('/api.orderAutoCollection', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("order")
    .find({status: "New"}).sort({"_id": -1})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        queue = new Array(57)
        arr = result.map(o => {
          let p = o.promiseTime.split(':');
          let p_hour = +p[0];
          let p_minute = +p[1]
          return {
            index: 4 * (p_hour - 8) + (p_minute / 15), 
            id_list: [o._id], 
            timeRunEngine: p_hour * 60 + p_minute - o.duration_delivery - 2}
          })
        
        const alo = arr.reduce((acc, curr) => {
          const group = acc.find(g => g.index === curr.index)
          if (group) {
            group.id_list = group.id_list.concat(curr.id_list).sort((a,b) => a - b)
            group.timeRunEngine = Math.min(group.timeRunEngine, curr.timeRunEngine)
          } else {
            acc.push({index: curr.index, id_list: curr.id_list, timeRunEngine: curr.timeRunEngine })
          }
          return acc
        }, [])
    
        res.send(alo);
      }
    });
});

recordRoutes.get('/api.orderById/:id', async function (req, res) {
  const {id} = req.params
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("order")
    .find({_id: ObjectId(id)})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching order by id!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.get('/api.getVehicleById/:id', async function (req, res) {
  const {id} = req.params
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("vehicle")
    .find({_id: ObjectId(id)})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching vehicle by id!");
     } else {
        res.json(result);
      }
    });
});

recordRoutes.get("/api.getOrderByIdList", async (req, res, next) => {
  try{
    let {id_list} = req.body
    let object_id_list = id_list.map(i => ObjectId(i))
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .find({ "_id": { "$in": object_id_list }})
        .toArray((err, result) => {
          if (err) {
            res.status(400).send("Error fetching Order by ID list!");
         } else {
            res.json(result);
          }
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.put('/api.updateProfile', async (req, res, next) => {
  try{
    let updateProfile = req.body
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("customer")
        .update({username: updateProfile.username}, {$set: updateProfile}, (err, doc) => {
          res.json(updateProfile)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.put('/api.updatePassword', async(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt)

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
            dbConnect
            .collection("customer")
            .update({username: username}, {$set: {password: hashedPassword}}, (err, doc) => {
              res.json(doc)
            })
        }
        else{
            res.status(403).send({message : "Mật khẩu không chính xác"});
        }
        }
      )
    } else{
      res.status(404).send()
    }
  })
})

recordRoutes.delete('/api.deleteStaffById/:id', async function (req, res, next) {
  try{
    const {id} = req.params
    const dbConnect = dbo.getDb();
        await dbConnect
        .collection("user")
        .deleteOne({_id: ObjectId(id)}, (err, result) => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
})

recordRoutes.get("/api.getRevenue", async (req, res, next) => {
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .find({})
        .toArray((err, result) => {
          if (err) {
            res.status(400).send("Error fetching Order !");
         } else {
            let revenue = result.map(o => o.total).reduce((x,y) => x+y, 0)
            res.json(revenue);
          }
        })
  } catch{
        res.status(500).send();
  }
});


recordRoutes.get("/api.getRevenue", async (req, res, next) => {
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .find({})
        .toArray((err, result) => {
          if (err) {
            res.status(400).send("Error fetching Order !");
         } else {
            let revenue = result.map(o => o.total).reduce((x,y) => x+y, 0)
            res.json(revenue);
          }
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.post('/api.addUser', async (req, res, next) => {
  try{
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.userForm.password, salt)
      var newUser = {
        name: req.body.userForm.name,
        username: req.body.userForm.username,
        email: req.body.userForm.email,
        phone: req.body.userForm.phone,
        password: hashedPassword,
        role: "staff"
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

recordRoutes.get('/api.orderAutoCollection', async function (req, res) {
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("order")
    .find({status: "New"}).sort({"_id": -1})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
     } else {
        queue = new Array(57)
        arr = result.map(o => {
          let p = o.promiseTime.split(':');
          let p_hour = +p[0];
          let p_minute = +p[1]
          return {
            index: 4 * (p_hour - 8) + (p_minute / 15), 
            id_list: [o._id], 
            timeRunEngine: p_hour * 60 + p_minute - o.duration_delivery - 2}
          })
        
        const alo = arr.reduce((acc, curr) => {
          const group = acc.find(g => g.index === curr.index)
          if (group) {
            group.id_list = group.id_list.concat(curr.id_list).sort((a,b) => a - b)
            group.timeRunEngine = Math.min(group.timeRunEngine, curr.timeRunEngine)
          } else {
            acc.push({index: curr.index, id_list: curr.id_list, timeRunEngine: curr.timeRunEngine })
          }
          return acc
        }, [])
    
        res.send(alo);
      }
    });
});

recordRoutes.get("/api.orderLastWeek", async (req, res, next) => {
  let d =  new Date()
  d.setDate(d.getDate()-6)
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .find({'date': {
          $gte: d
        },
        }).toArray((err, result) => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get("/api.numOrders", async (req, res, next) => {
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .count().then(result => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get("/api.bestSelling", async (req, res, next) => {
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("order")
        .find({})
        .toArray((err, result) => {
          let order = result.map(x => x.order.map(y => {return {name: y.name, num: y.num, price: y.price}}))
                      .reduce((a, b) => {
                        return a.concat(b)
                      })
          let arr = order.reduce((acc, curr) => {
            const group = acc.find(g => g.name === curr.name)
            if (group) {
              group.num = group.num + curr.num
            } else {
              acc.push({name: curr.name, num: curr.num, price: curr.price})
            }
            return acc
          }, [])
          arr.sort((a,b) => b.num - a.num)
          res.send(arr)
        })
  } catch{
        res.status(500).send();
  }
});

recordRoutes.get("/api.numCus", async (req, res, next) => {
  try{
    const dbConnect = dbo.getDb();
      await dbConnect
        .collection("customer")
        .count().then(result => {
          res.json(result)
        })
  } catch{
        res.status(500).send();
  }
});
module.exports = recordRoutes;

