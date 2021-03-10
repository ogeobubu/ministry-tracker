const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "You are unauthorized to view this.",
      });
    }

    jwt.verify(token, process.env.TOKEN, (error, user) => {
      if (error) {
        return res.status(401).json({
          message: "You are unauthorized to view this.",
        });
      }

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authUser;
