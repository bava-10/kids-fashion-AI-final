const { aggregatePrices, calcEffectivePrice, rankByValue } = require("../services/priceService");

// Task 6 & 7
const getPrices = async (req, res) => {
  try {
    const { product_id, sellers } = req.body;

    if (!product_id || !Array.isArray(sellers)) {
      return res.status(400).json({
        success: false,
        message: "product_id and sellers array required"
      });
    }

    const aggregated = aggregatePrices(product_id, sellers);
    const effective  = calcEffectivePrice(aggregated);

    res.status(200).json({
      success: true,
      data: { ...aggregated, effective }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Task 8
const getValueRanking = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,
        message: "products array required"
      });
    }

    const result = rankByValue(products);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPrices, getValueRanking };