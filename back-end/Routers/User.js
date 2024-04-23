const express = require("express");
const UserRouter = express.Router();
const { upload } = require("../Middleware/multer")

const {
  createUser,
  getAllUser,
  getUserById,
} = require("../controllers/UserController");

UserRouter.get("/", getAllUser)
  .post("/create",upload.single("profilePicture"), createUser)
  .get("/:id", getUserById);

module.exports = { UserRouter };
