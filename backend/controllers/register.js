const { userDatabase } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
const fsPromise = require("fs").promises;
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("../model/User");

const createNewUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username: username });
    console.log("existing user is", existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    //create a new user
    await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { createNewUser };
