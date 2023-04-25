require("dotenv").config();
const jwt=require("jsonwebtoken");

async function authenticator(req,res,next){
    try {
        const token=req.headers.authorization;
        // const token=req.cookie.token;
        if(token){
            jwt.verify(token,process.env.key,(err, decoded)=>{
                if(decoded){
                    req.body.userID=decoded.userID;
                    req.body.user=decoded.userID;
                    next();
                }else{
                    res.status(404).json({"msg":"Authorization restricted!","err":err.message});
                }
              });
        }else{
            res.status(404).json({"msg":"Authorization restricted!, please login first"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(404).json({"msg":"somrthing wrong with authenticator","err":error.message});
    }
}



module.exports={
    authenticator
}