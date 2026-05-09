const express = require("express");
const router = express.Router();

const mapAttributes = require("../services/attributeMapper");

router.post("/map", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Product text is required"
    });
  }

  const result = mapAttributes(text);

  res.json(result);
});

module.exports = router;