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
