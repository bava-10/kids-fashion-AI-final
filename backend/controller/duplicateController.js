const { detectDuplicates } = require("../services/duplicateServices");

const findDuplicates = async (req, res) => {
  try {
    const { products, threshold } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a products array"
      });
    }

    const result = detectDuplicates(products, threshold || 0.8);

    res.status(200).json({
      success: true,
      total_groups: result.length,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { findDuplicates };