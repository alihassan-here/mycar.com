const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");
class Authorization {
  authorized(req, res, next) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split("Bearer ")[1];
      const verifyToken = jwt.verify(token, JWT_SECRET);
      if (verifyToken) {
        req.id = verifyToken?.id;
        next();
      } else {
        return res.status(401).json({
          errors: [{ msg: "Invalid token" }],
        });
      }
    } else {
      return res.status(401).json({
        errors: [{ msg: "unauthorized access" }],
      });
    }
  }
}

module.exports = new Authorization();
