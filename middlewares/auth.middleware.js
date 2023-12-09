const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.send("no token");
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.send("invalid token");
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

module.exports = authMiddleware;

// Improved Error Responses + Extract Bearer Token

// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(' ')[1]; // Extracting the token from "Bearer [token]"
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) return res.status(401).json({ message: "Invalid token" });
//       req.user = decoded; // Add the decoded user data to the request object
//       next();
//     });
//   } catch (error) {
//     res.status(401).json({ message: "Authentication failed", error: error.message });
//   }
// };

// module.exports = authMiddleware;
