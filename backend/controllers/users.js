const User = require("../model/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllUsers };
