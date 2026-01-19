import User from "../model/user.js";
import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken" ;
export const postproduct = async(req , res , next ) => {
    const { email , password } = req.body ;
    if(!email || !password){
        return res.status(400).json({message :"all field required"})
    }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "invalid email "}) ;
    }
    let user = await User.findOne({email : email });
   
     if(!user){
        
        const hashedPassword = await bcrypt.hash(password , 12 ) ;
     
    user = new User({
        email ,
        password : hashedPassword ,


    });
    await user.save() ;
     console.log("NEW USER CREATED");
}
else {
     console.log("EXISTING USER FOUND");
    const isMatch = await bcrypt.compare(password , user.password ) ;
    if(!isMatch){
        return res.status(401).json({message : "invalid password "}) ;


    }

}
console.log("USER =", user);
const token = jwt.sign({email : user.email  , id : user._id } , process.env.JWT_SECRET_KEY , {expiresIn : '24h' } ) ;
res.json({token : token }) ;


}
 export const authenticate = (req , res , next ) => {
    const authHeader = req.headers.authorization ;
    console.log(authHeader) ;
    if(!authHeader){
        return res.status(401).json({message : "authorization header missing "}) ;
    }
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
    const token = authHeader.split(" ")[1] ;
    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , decoded ) => {
        if(err){
            return res.status(401).json({message : "invalid token "}) ;
        }
        console.log(decoded) ;
        req.user = decoded ;
        next() ;
    }) ;

};
