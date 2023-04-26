var jwt = require('jsonwebtoken');

const fetchuser = (req,res,next)=>{

    // get the user from jwt token and id to req object
    const token = req.header("auth-token");
    if (!token){
        
        res.status(401).send({error: "Please authenticate using a valid token 1"});
    }
    console.log("token ",token);
    try {
        const data  = jwt.verify(token,"JWT_SECRET");
        // console.log("data ",data);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({error: "Please authenticate using a valid token 2"});
    }
    


}

module.exports = fetchuser;
