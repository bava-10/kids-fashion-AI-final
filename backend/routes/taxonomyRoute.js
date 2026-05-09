const express = require("express");
const router = express.Router();

const taxonomy = require("../data/taxonomy.json");

router.get("/", (req, res) => {
  res.json(taxonomy);
});

module.exports = router;