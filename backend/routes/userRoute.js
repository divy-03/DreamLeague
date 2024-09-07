const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  getUserDetails,
  forgotPassword,
  updatePassword,
  resetPassword,
  updateProfile,
  getAllUsers,
  getUser,
  editUserRole,
  deleteUser,
  ratePlayer,
} = require("../controller/userController");
const router = express.Router();
const { fetchUser, authRole } = require("../middleware/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").post(fetchUser, logOutUser);
router.route("/auth/profile").get(fetchUser, getUserDetails);
router.route("/auth/update").put(fetchUser, updateProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/update").put(fetchUser, updatePassword);
router.route("/password/reset/:token").put(resetPassword);

router
  .route("/admin/users")
  .get(fetchUser, authRole("admin", "owner"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(fetchUser, authRole("admin", "owner"), getUser);
router.route("/admin/user/:id").put(fetchUser, authRole("owner"), editUserRole);
router
  .route("/admin/user/:id")
  .delete(fetchUser, authRole("admin", "owner"), deleteUser);
router.route("/admin/rate/:id").post(fetchUser, authRole("admin", "owner"), ratePlayer);

module.exports = router;
