const express = require("express");
const { authAdmin, registerAdmin } = require("../controller/adminController");

const router = express.Router();

router.route("/adminRegister").post(registerAdmin);
router.post("/login", authAdmin);

module.exports = router;
