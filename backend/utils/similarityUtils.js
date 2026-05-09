function calculateSimilarity(product1, product2) {
  let score = 0;

  // Brand match
  if (product1.brand === product2.brand) {
    score += 30;
  }

  // Type/design similarity
  const type1 = product1.type.toLowerCase();
  const type2 = product2.type.toLowerCase();

  if (
    type1 === type2 ||
    (type1 === "t-shirt" && type2 === "tee") ||
    (type1 === "tee" && type2 === "t-shirt")
  ) {
    score += 25;
  }

  // Material overlap
  if (product1.material === product2.material) {
    score += 20;
  }

  // Price similarity
  const priceDiff = Math.abs(product1.price - product2.price);

  if (priceDiff <= 50) {
    score += 25;
  }

  return score;
}

module.exports = calculateSimilarity;