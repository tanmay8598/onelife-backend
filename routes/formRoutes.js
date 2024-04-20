const express = require("express");
const { admin } = require("../middleware/authmiddleware");
const {
  createForm,
  deleteForm,
  getForms,
  getFormById,
} = require("../controller/formController");
const { createEmail, getEmails } = require("../controller/emailController");

const router = express.Router();

router.post("/create-form", createForm);
router.post("/create-email", createEmail);
router.get("/all", getForms);
router.get("/allEmails", getEmails);
router.delete("/delete-form", admin, deleteForm);
router.route("/formbyid/:id").get(getFormById);

module.exports = router;
