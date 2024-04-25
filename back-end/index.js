const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const dotenv = require("dotenv");
const { UserRouter } = require("./Routers/User");
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet")
dotenv.config();
connection();

const port = process.env.PORT || 5000;

const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: "https://tree-leaf-coding-task.vercel.app",
  optionsSuccessStatus: 200,
};

app
  .options("*", cors(corsOptions))
  .use(cors(corsOptions))
  .use(express.json())
  .use(helmet())
  .use(morgan("dev"))
  .get("/", (req, res) => {
    return res.json("Welcome to tree leaf api");
  })
  .options("/api/user", cors()) //enable preflight request
  .use("/api/user", cors(corsOptions), UserRouter)
  .use(express.static(path.join(__dirname, "uploads")))
  .get("/uploads/:filename", (req, res) => {
    const filename = path.resolve(__dirname, "uploads", req.params.filename);
    res.sendFile(filename, (err) => {
      if (err) {
        console.log("Error sending file:", err);
        if (!res.headersSent) {
          res.status(404).send("File not found");
        }
      }
    });
  })
  .use((err,req,res,next) => {
    console.log(err.stack)
    res.status(500).json({
      msg:err
    })
  })
  .get("*", (req, res) => {
    return res.send("Sorry,Route not found");
  });

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
