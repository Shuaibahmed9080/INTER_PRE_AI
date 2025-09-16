const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (userid) => {
    return jwt.sign({ id: userid }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//@desc Register a new user
//@route Post/api/auth/register
//@access public
const registerUser = async (req, res) =>{
    try{
        const{ name, email, password}=
        req.body;

        //check if user already exists

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message:"User alreay exists"})
        }
        //hase password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        //Retrun user data with JWT
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });

    }catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
    
}
//@desc Register a new user
//@route Post/api/auth/register
//@access public
const loginUser = async (req, res) =>{
try{
    const { email, password} = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(500).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return user data with JWT
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });

}catch(error){
    res.status(500).json({ message: "Server error", error: error.message });
}
};
//@desc Register a new user
//@route Post/api/auth/register
//@access public
// const getUserProfile = async (req, res) =>{
// }

module.exports = {registerUser, loginUser}