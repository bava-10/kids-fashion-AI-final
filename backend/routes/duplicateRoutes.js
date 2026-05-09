const express = require("express");
const router = express.Router();
const { findDuplicates } = require("../controller/duplicateController");

router.post("/detect", findDuplicates);

module.exports = router;