const express = require("express");
const router = express.Router();
const { getQueryParsed, getRankedProducts, getSubstitutes } = require("../controller/recommendationController");

router.post("/parse",     getQueryParsed);
router.post("/rank",      getRankedProducts);
router.post("/substitute", getSubstitutes);

module.exports = router;