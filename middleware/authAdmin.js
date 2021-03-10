const User = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.role !== "admin") {
      return res.status(401).json({
        message: "Admin resource. You are unauthorized to access this.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authAdmin;
