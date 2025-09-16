const jwt = require("jsonwebtoken")
const User = require("../models/User");

//Middleware to protect routes
const protect = async(req , res, next) => {
    try{
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1];//Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }else{
            res.status(401).json({ message: "Not authorized, no token" });
        }
    }catch(error){
        res.status(401).json({ message: "Not authorized, token failed" });
    }

};

module.exports = { protect };
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     try {
//       // Extract token
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request
//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(401).json({ message: "User not found" });
//       }

//       next();
//     } catch (error) {
//       console.error("JWT verification failed:", error.message);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };
