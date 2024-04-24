const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const dotenv = require("dotenv");
const { UserRouter } = require("./Routers/User");
const morgan = require("morgan");
const path = require("path")
dotenv.config();
connection();

const port = process.env.PORT || 5000;

app
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
      origin: "https://tree-leaf-coding-task.onrender.com",
    })
  )
  .use(express.json())
  .use(morgan("dev"))
  .get("/",(req,res) => {
    return res.json("Welcome to tree leaf api")
  })
  .use("/api/user", UserRouter)
  .use("/uploads",express.static(__dirname + "uploads"))
  .use("/uploads/:filename",(req,res) => {
    const filePath = path.join(__dirname, "uploads",req.params.filename)
    res.sendFile(filePath, (err) => {
      if (err) {
          console.log('Error sending file:', err);
          if (!res.headersSent) {
              res.status(404).send("File not found");
          }
      }
  });
  })
  .get("*",(req,res) => {
    return res.send("Sorry,Route not found")
  })

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
