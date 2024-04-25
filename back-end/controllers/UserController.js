const User = require("../models/User");
const Address = require("../models/Address");

const createUser = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const fileName = req.file.filename;
    const encodedFilename = encodeURIComponent(fileName);
    console.log(encodedFilename);

    const { name, email, phone_no, DOB, address } = req.body;
    const newAddress = new Address({
      City: address.City,
      District: address.District,
      Province: address.Province,
      Country: address.Country,
    });
    const savedAddress = await newAddress.save();
    const user = new User({
      name,
      email,
      phone_no,
      DOB,
      address: savedAddress._id,
      profilePicture: process.env.APP_URL + encodedFilename,
    });
    const data = await user.save();
    return res.json(data);
  } catch (e) {
    console.log(e)
    return res.status(400).json(e.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("address").exec();
    res.send(user);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
};

const UpdateUserById = async (req, res) => {
  const { id } = req.params;
  const fileName = req.file.filename;
  const encodedFilename = encodeURIComponent(fileName);
  req.body.profilePicture =  `${process.env.APP_URL}` `uploads/${encodedFilename}`

  const {address , ...data} = req.body
  try {
    if (address && address._id) {
      await Address.findByIdAndUpdate(address._id, address);
  }
    const user = await User.findByIdAndUpdate(id, data);
    if(!user){
      return res.status(400).json({msg:"Error updating the user"})
    }
    res.send(user);
  } catch (e) {
    return res.status(400).json({
      msg: e,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  deleteUserById,
  UpdateUserById,
};
