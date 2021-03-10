const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, number, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "This user already exists.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = {
        firstName,
        lastName,
        number,
        email,
        password: hashedPassword,
      };

      const newUser = await User(user);

      await newUser.save();

      res.status(201).json({
        message: "Registration was successful. Please login now!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist.",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Password is incorrect.",
      });
    }

    const loginToken = (payload) => {
      return jwt.sign(payload, process.env.TOKEN, {
        expiresIn: "30m",
      });
    };

    const token = loginToken({ id: user._id });

    return res.status(200).json({
      message: {
        token,
        info: "You are logged in!",
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("--password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("--password");

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { firstName, lastName, role } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        firstName,
        lastName,
      }
    );

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist!",
      });
    }

    return res.status(200).json({
      message: "User has been updated!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(400).json({
      message: "This user does not exist!",
    });
  }

  return res.status(200).json({
    message: "User has successfully been deleted.",
  });
};
