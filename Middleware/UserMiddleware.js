const jwt = require("jsonwebtoken");
function UserMiddleware(req, res, next) {
  console.log(req.headers);

  jwt.verify(req.headers.token, process.env.PRV_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).send("invalid token");
    } else {
      if (decoded.email) {
        next();
      }
    }
  });
}

module.exports = UserMiddleware;
