const express = require("express");
const UserRouter = express.Router();
const { upload } = require("../Middleware/multer")

const {
  createUser,
  getAllUser,
  getUserById,
  deleteUserById,
  UpdateUserById,
} = require("../controllers/UserController");

UserRouter.get("/", getAllUser)
  .post("create",upload.single("profilePicture"), createUser)
  .get(":id", getUserById)
  .delete(":id",deleteUserById)
  .put("update/:id",upload.single("profilePicture"),UpdateUserById)

module.exports = { UserRouter };
