const express = require("express");
const {
  register,
  login,
  getAllUsers,
  getUser,
  editUser,
  deleteUser,
} = require("../controllers/auth");
const authAdmin = require("../middleware/authAdmin");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/info", authUser, getUser);
router.get("/all_info", authUser, authAdmin, getAllUsers);
router.patch("/update", authUser, editUser);
router.delete("/delete/:id", authUser, authAdmin, deleteUser);

module.exports = router;
