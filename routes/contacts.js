const express = require("express");
const router = express.Router();
const { createContactRules, checkCreateRules } = require("../middleware/validator");

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);
router.post("/", createContactRules(), checkCreateRules, contactsController.create);
router.put("/:id", contactsController.update);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
