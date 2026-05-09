const rules = require("../utils/extractionRules");
const normalizeAge = require("../utils/normalizeAge");

function findType(text) {
  for (const key in rules.types) {
    if (rules.types[key].some(word => text.includes(word))) {
      return key;
    }
  }

  return null;
}

function extractPipeline(data) {
  const text = data.toLowerCase();

  // Brand
  const brand = rules.brands.find(b => text.includes(b));

  // Material
  const material = rules.materials.find(m => text.includes(m));

  // Price
  const priceMatch = text.match(/₹\s?(\d+)|rs\.?\s?(\d+)/i);

  const price = priceMatch
    ? Number(priceMatch[1] || priceMatch[2])
    : null;
  return {
    product_id: "P" + Math.floor(Math.random() * 10000),
    brand: brand || null,
    type: findType(text),
    material: material || null,
    age_group: normalizeAge(text),
    price
  };
}

module.exports = extractPipeline;