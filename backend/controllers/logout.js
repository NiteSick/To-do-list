const { userDatabase } = require("../utils/utils");
const fsPromise = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  const foundUser = userDatabase.users.find((eachUser) => {
    eachUser.refreshToken === refreshToken;
  });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const newUsers = userDatabase.users.map((eachUser) =>
    eachUser.username === foundUser.username ? foundUser : eachUser
  );

  userDatabase.setUsers(newUsers);

  //setting in file
  fsPromise.writeFile(
    path.join(__dirname, "..", "model", "user.json"),
    JSON.stringify(newUsers)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};
module.exports = { handleLogout };
