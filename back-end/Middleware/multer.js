const multer = require("multer");
const path = require("path");

const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./uploads";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const acceptedExtensionsList = [".png"];
    const extname = path.extname(file.originalname).toLowerCase();
    if (acceptedExtensionsList.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file extension"));
    }
  },
});
module.exports = { upload };
