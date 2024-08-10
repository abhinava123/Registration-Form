const User=require('../models/user')
exports.registerUser=async(req,res)=>{
  try {
    const {fullName,email,password}=req.body
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered with this email" });
    }
    const newUser = await User.create({ fullName, email, password });
    res.status(200).json({
      success:true,
      message:'user registerd successfully',
      newUser
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
}