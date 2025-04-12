const { userDatabase } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
const fsPromise = require("fs").promises;
const bcrypt = require("bcryptjs");
const path = require("path");

const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists in the database

    const existingUser = userDatabase.users.find(
      (user) => user.username === username
    );
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user object
    const newUser = {
      id: uuidv4(),
      username: username,
      password: hashedPassword,
    };

    // Add the new user to the database
    const newUsers = [...userDatabase.users, newUser];
    userDatabase.setUsers(newUsers);
    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(newUsers, null, 2)
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { createNewUser };
