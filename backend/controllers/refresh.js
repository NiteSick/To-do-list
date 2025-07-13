const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  console.log("handle refresh ", req);
  console.log("cookie is ", cookies);
  if (!cookies?.jwt)
    return res.status(401).json({ error: "jwt cookie not found" });

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });

  console.log("cookie is ", foundUser);
  if (!foundUser) {
    return res.sendStatus(403); //Forbidden
  }

  // evaluate jwt
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
    console.log("decoded is ", decoded.username);
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: decoded.username,
          userId: foundUser.id,
        },
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    );
    res.status(200).json({
      status: "success",
      accessToken,
      user: { username: foundUser.username },
    });
  });
};

module.exports = { handleRefresh };
