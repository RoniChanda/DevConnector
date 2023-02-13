const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Retrieve token from header
  const token = req.headers.authorization.split(" ")[1];
  // const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token and get decoded payload
  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRETKEY);
    // send payload along with request and continue to next middlewares
    req.user = decodedPayload.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
