const User = require("../models/User")
const Address = require("../models/Address")
 
const createUser = async (req,res) => {
    console.log(req.body)
    console.log(req.file)
    try {
        const { name,email,phone_no,DOB,address } = req.body
        const newAddress = new Address({
            City: address.City,
            District: address.District,
            Province: address.Province,
            Country: address.Country
        })
        const savedAddress = await newAddress.save()
        const user = new User({
            name,
            email,phone_no,
            DOB,
            address:savedAddress._id,
            profilePicture: "http://localhost:5000/" + req.file.path 
        })
        const data = await user.save()
        return res.json(data)
    }catch(e){
        return res.status(400).json(e.message)
    }
}

const getAllUser = async (req,res) => {
    try {
        const users =  await User.find({})
        res.send(users)
    }catch(e){
        return res.status(400).json({msg:e.message})
    }
}

const getUserById = async (req,res) => {
    try {
        const { id} =  req.params
        const user = await User.findById(id)
        res.send(user)
    }catch(e){
        return res.status(400).json({msg:e.message})
    }
}

const deleteUserById = async () => {
    try {
        const { id } =  req.params
        const user = await User.findByIdAndDelete(id)
        res.send(user)
    }catch(e){
        return res.status(400).json({msg:e.message})
    }
}

const findUserByPagination = async (req,res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default page to 1 and limit to 10
        
        const users = await User.find()
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        
        const count = await User.countDocuments(); // Total count of documents
    
        res.json({
          users,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    deleteUserById,
    findUserByPagination
}