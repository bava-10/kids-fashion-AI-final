const express = require("express");
const router = express.Router();
const { getPrices, getValueRanking } = require("../controller/priceController");

router.post("/aggregate", getPrices);
router.post("/rank", getValueRanking);

module.exports = router;