const jwt= require("jsonwebtoken");

async function generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: "1d"});
}

async function verifyToken(token, secret){
    return jwt.verify(token,  process.env.JWT_SECRET);
}

module.exports={
    generateToken,
    verifyToken
}