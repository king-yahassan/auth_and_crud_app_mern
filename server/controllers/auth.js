const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

// function to generate a token
const createToken = (id, pseudo)=>{
    return jwt.sign(
        { data:{id, pseudo} },
        process.env.JWT_KEY,
        { expiresIn : "30d"}
    )
}
// console.log(createToken(123, "king"));



// register or SignUp
module.exports.signUP = async (req, res)=> {
    const {pseudo, email, password} = req.body ;

    // Before to create a new user we verify if this user is already exist or not
    const userEmailExist = await User.findOne({email : email})
    const userPseudoExist = await User.findOne({pseudo : pseudo})

    if(userEmailExist){
        res.status(409).json({message : "User with  this email is already Exist!"})
    }
    else if(userPseudoExist){
        res.status(409).json({message : "User with  this pseudo is already Exist!"})
    }
    else{
    // crypt password
    const salt = await bcrypt.genSalt(10) ;
    const cryptpassword = await bcrypt.hash(password , salt);
    //a new user created!!!
    const user = await User.create({
        pseudo,
        email,
        password : cryptpassword
    });
    return res.status(201).json({
        message : " User create with successfully...",
    })};
}

// Connection or signIn
module.exports.signIn = async(req,res)=>{
    const {email, password} = req.body ;
    const  user= await User.findOne({email : email});
    if(!user){
        return res.status(401).json({
            message : `the user with this email : ${email} does'nt exist... `
        });
    }
    const comparepassword =await bcrypt.compareSync(password, user.password);
    if(!comparepassword){
        return res.status(401).json({
            message: "Incorrect Password"
        });
    }
    const token = createToken(user._id, user.pseudo)
    res.status(200).json({
        message : "Successfully connection",
        token
    });
}