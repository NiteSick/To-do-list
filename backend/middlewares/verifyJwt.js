const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("auth header", authHeader);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ message: "invalid token" }); //invalid token

    req.user = {
      username: decoded.UserInfo?.username,
      id: decoded.UserInfo?.userId,
    };
    next();
  });
};

module.exports = verifyJWT;
