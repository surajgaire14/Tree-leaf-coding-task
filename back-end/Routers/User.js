const express = require("express");
const UserRouter = express.Router();
const { upload } = require("../Middleware/multer")

const {
  createUser,
  getAllUser,
  getUserById,
  deleteUserById,
} = require("../controllers/UserController");

UserRouter.get("/", getAllUser)
  .post("/create",upload.single("profilePicture"), createUser)
  .get("/:id", getUserById)
  .delete("/:id",deleteUserById)

module.exports = { UserRouter };
