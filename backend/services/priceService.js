"use strict";

// Task 6: Multi-Seller Price Aggregation
function aggregatePrices(productId, sellers) {
  const offers = sellers
    .filter(s => s.price && s.price > 0)
    .map(s => ({
      seller: s.seller || "unknown",
      price: parseFloat(s.price)
    }))
    .sort((a, b) => a.price - b.price);

  return {
    product_id: productId,
    offers
  };
}

// Task 7: Effective Price Calculation
function calcEffectivePrice(aggregated) {
  const prices = aggregated.offers.map(o => o.price);

  if (prices.length === 0) {
    return {
      product_id: aggregated.product_id,
      best_price: null,
      price_range: null
    };
  }

  return {
    product_id: aggregated.product_id,
    best_price: Math.min(...prices),
    price_range: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  };
}

// Task 8: Value Ranking
const MATERIAL_DURABILITY = {
  cotton: 0.85, organic_cotton: 0.90, denim: 0.90,
  wool: 0.88, fleece: 0.80, silk: 0.70,
  blended: 0.72, polyester: 0.65, nylon: 0.68
};

const MATERIAL_COMFORT = {
  cotton: 0.95, organic_cotton: 1.0, silk: 0.88,
  wool: 0.80, fleece: 0.82, blended: 0.75,
  polyester: 0.60, nylon: 0.55, denim: 0.65
};

const TRUSTED_BRANDS = ["hopscotch","fabindia","mothercare","zara","h&m","westside"];

function calcValueScore(product, maxPrice = 1500) {
  const durability = MATERIAL_DURABILITY[product.material] || 0.65;
  const comfort    = MATERIAL_COMFORT[product.material]    || 0.65;
  const priceScore = product.price ? Math.max(0, 1 - product.price / maxPrice) : 0.5;
  const brandScore = TRUSTED_BRANDS.includes((product.brand || "").toLowerCase()) ? 1 : 0.7;

  const raw = (durability * 0.30) + (comfort * 0.30) + (priceScore * 0.25) + (brandScore * 0.15);
  return parseFloat(raw.toFixed(2));
}

function rankByValue(products) {
  return products
    .map(p => ({
      product_id:  p.product_id,
      value_score: calcValueScore(p)
    }))
    .sort((a, b) => b.value_score - a.value_score);
}

module.exports = { aggregatePrices, calcEffectivePrice, calcValueScore, rankByValue };