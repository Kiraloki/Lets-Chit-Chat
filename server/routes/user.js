const express = require("express");

const { userAuth, registerUser, allUsers } = require("./../controllers/user");

const { protect } = require("./../middleware/auth");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);

router.post("/login", userAuth);

module.exports = router;
