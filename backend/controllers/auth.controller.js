const userModel = require("../models/user.model")
const tokenBlacklistModel = require("../models/BLacklistl.model")

const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function  registerusercontroller(req, res) {
  console.log("Register body:", req.body)
 
 
 
 
  const{username, email, password}=req.body
  if(!username||!email||!password){
    return res.status(400).json({
      message:"please provide username , email or password"
    })

  }
  const  isuserAlreadyExists = await userModel.findOne({
    $or:[{username}, {email}]
  })
  if(isuserAlreadyExists){
    return res.status(400).json({
      message:"your account is already exists "
    })
  }

  const hash = await bcript.hash(password, 10)
  const user = await userModel.create({
    username,
    email,
    password:hash
  }) 
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )
  res.cookie("token", token)

  res.status(201).json({
    message: "user register succesfully",
    user:{
      id: user._id,
      username: user.username,
      email: user.email

    }
 })
 


  
}

async function loginUserController(req, res){
  const {password , email}=req.body
  const user = await userModel.findOne({email})
  if(!user){
    return res.status(400).json({
      message: " invalid email or password "
    })
  }
  const isPasswordisValid = await bcript.compare(password, user.password)
  if (!isPasswordisValid){
    return res.status(400).json({
      message: " invalid email or password "
    })
  }
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )
  res.cookie("token",token)
  res.status(201).json({
  message:"Logged in succesfully",
  user:{
    id: user._id,
    username: user.username,
    email: user.email
  }
})
} 
async function logoutUserController(req,res){
  const token =req.cookies.token
  if(token){
    await tokenBlacklistModel.create({token})
  }
  res.clearCookie("token")
  res.status(200).json({
    message: " User logout successfully."
  })
}
async function getMecontroller(req, res){
  const user = await userModel.findById(req.user.id) 
  res.status(200).json({
    message:"user detail fetched succesfully",
    user:
    {id:user._id,
    username: user.username,
    email: user.email
    }
  })
}


module.exports={
  registerusercontroller,
  loginUserController,
  logoutUserController,
  getMecontroller,
}