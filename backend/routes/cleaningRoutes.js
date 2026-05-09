const express = require("express");
const router = express.Router();
const { cleanProducts } = require("../controller/cleaningController");

router.post("/clean", cleanProducts);

module.exports = router;