const jwt = require("jsonwebtoken");

authenticate = (req, res, next) => {
  const token = req.cookies.Auth;
  
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json(err.message);
    } else {
      next();
    }
  });
};

module.exports = authenticate;
