const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    const token =req.headers.token;
    // const token = req.headers.authorization?.split(' ')[1];
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded;
            console.log('Decoded token:', decoded); // Debug the decoded payload
    
            
            next();
            
        } catch (error) {
            return res.status(401).json({error:"Invalid token"})
        }
    }
    else {
        return res.status(401).json({error:"Token is required"})
        
    }

}


module.exports = {
    verifyToken,
 
}