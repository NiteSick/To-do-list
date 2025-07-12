const bcrypt = require("bcryptjs");
const User = require("../model/User");

const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    //create a new user
    await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { createNewUser };
