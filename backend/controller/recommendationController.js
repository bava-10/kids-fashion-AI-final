const { parseQuery, rankProducts, findSubstitutes } = require("../services/recommendationServices");

// Task 9: Parse Query
const getQueryParsed = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ success: false, message: "query required" });

    res.status(200).json({ success: true, data: parseQuery(query) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Task 10: Rank Products
const getRankedProducts = async (req, res) => {
  try {
    const { query, products } = req.body;
    if (!query || !Array.isArray(products)) {
      return res.status(400).json({ success: false, message: "query and products array required" });
    }

    const parsed = parseQuery(query);
    const ranked = rankProducts(products, parsed);

    res.status(200).json({ success: true, parsed_query: parsed, data: ranked });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Task 11: Find Substitutes
const getSubstitutes = async (req, res) => {
  try {
    const { product, products, count } = req.body;
    if (!product || !Array.isArray(products)) {
      return res.status(400).json({ success: false, message: "product and products array required" });
    }

    const result = findSubstitutes(product, products, count || 3);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getQueryParsed, getRankedProducts, getSubstitutes };