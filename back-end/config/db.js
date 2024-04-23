const mongoose = require("mongoose");

const connection = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
      console.log(`connected to database ==> ${res.connections[0].name}`);
    })
    .catch((e) => {
      console.error(e.message);
    });
};

module.exports = { connection };