const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userDatabase } = require("../utils/utils");
const path = require("path");
const fsPromise = require("fs").promises;

const createAccessToken = (userId, username) => {
  return jwt.sign(
    {
      UserInfo: {
        username: username,
        userId: userId,
      },
    },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
  );
};

const createRefreshToken = (username) => {
  return (refreshToken = jwt.sign(
    { username: username },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }
  ));
};

const validatePassword = async (plainPassword, hashedPassword) => {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
};
const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = userDatabase.users.find(
      (eachUser) => eachUser.username === username
    );

    //If not user is found
    if (!foundUser) {
      return res.status(401).json({ message: "No such user exists" });
    }

    const isMatch = await validatePassword(password, foundUser.password);
    if (isMatch) {
      const accessToken = createAccessToken(foundUser.id, foundUser.username);

      const refreshToken = createRefreshToken(foundUser.username);

      //saving refresh token with current user
      foundUser.refreshToken = refreshToken;
      const newUsers = userDatabase.users.map((eachUser) =>
        eachUser.username === username ? foundUser : eachUser
      );
      userDatabase.setUsers(newUsers);

      await fsPromise.writeFile(
        path.join(__dirname, "..", "model", "user.json"),
        JSON.stringify(newUsers)
      );

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: "success",
        accessToken,
        user: { username: foundUser.username },
      });
    } else {
      return res.status(401).json({ message: "password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { handleLogin };
