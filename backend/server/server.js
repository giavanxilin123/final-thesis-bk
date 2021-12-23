
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
// get MongoDB driver connection
const dbo = require("./db/conn");
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ['GET', 'POST']
  }
})

io.on("connection", (socket) => {
  console.log('socket', socket.id)
  socket.on("disconnect", () => {
    console.log('disconnect ', socket.id)
  })
})

app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}))
app.use(require("./routes/record"));


dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})


