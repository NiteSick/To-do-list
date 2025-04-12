const { userDatabase } = require("../utils/utils");
const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;
  console.log("cookie is ", cookies);
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = userDatabase.users.find(
    (eachUser) => eachUser.refreshToken === refreshToken
  );

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
