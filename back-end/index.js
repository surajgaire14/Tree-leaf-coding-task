const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const dotenv = require("dotenv");
const { UserRouter } = require("./Routers/User");
const morgan = require("morgan");
dotenv.config();
connection();

const port = process.env.PORT || 5000;

app
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE"],
      origin: "http://localhost:5173",
    })
  )
  .use(express.json())
  .use(morgan("dev"))
  .get("/",(req,res) => {
    return res.json("Welcome to tree leaf api")
  })
  .use("/api/user", UserRouter)
  .use(express.static(__dirname + "/uploads"))
  .get("*",(req,res) => {
    return res.send("Sorry,Route not found")
  })

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
