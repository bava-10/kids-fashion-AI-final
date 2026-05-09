const express = require("express");
const router = express.Router();

const extractPipeline = require("../services/extractionServices");

router.post("/extract", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "Text required"
    });
  }

  const result = extractPipeline(text);

  res.json(result);
});

module.exports = router;