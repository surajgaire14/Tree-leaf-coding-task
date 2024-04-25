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

const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: ["https://tree-leaf-coding-task.vercel.app/"],
  optionsSuccessStatus:200,
}

app
  .use(
    cors(corsOptions)
  )
  .use(express.json())
  .use(morgan("dev"))
  .get("/",(req,res) => {
    return res.json("Welcome to tree leaf api")
  })
  .options("/api/user",cors()) //enable preflight request
  .use("/api/user",  cors(corsOptions) , UserRouter)
  .use(express.static(path.join(__dirname,"uploads")))
  // .use("/uploads/:filename",(req,res) => {
  //   const baseUrl = process.env.APP_URL; 
  //   // console.log(req.params.filename)
  //   const encodedFilename = encodeURIComponent(req.params.filename);
  //   const filePath = new URL(`uploads/${encodeURIComponent(req.params.filename)}`,baseUrl.toString())
  //   res.sendFile(filePath, (err) => {
  //     if (err) {
  //         console.log('Error sending file:', err);
  //         if (!res.headersSent) {
  //             res.status(404).send("File not found");
  //         }
  //     }
  // });
  // })
  .get("*",(req,res) => {
    return res.send("Sorry,Route not found")
  })



app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
