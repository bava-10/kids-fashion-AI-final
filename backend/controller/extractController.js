const extractAttributes = require("../utils/parser");

exports.extractProduct = (req, res) => {
  try {
    const inputText = req.body.text;

    const result = extractAttributes(inputText);

    res.json({
      success: true,
      data: result
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
