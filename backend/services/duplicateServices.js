"use strict";

function stringSimilarity(a, b) {
  if (!a || !b) return 0;
  const setA = new Set(a.toLowerCase().split(/\s+/));
  const setB = new Set(b.toLowerCase().split(/\s+/));
  const intersection = [...setA].filter(t => setB.has(t)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function priceSimilar(p1, p2) {
  if (!p1 || !p2) return false;
  return Math.abs(p1 - p2) / Math.max(p1, p2) <= 0.10;
}

function duplicateScore(a, b) {
  let score = 0;
  let factors = 0;

  if (a.brand && b.brand)       { score += stringSimilarity(a.brand, b.brand); factors++; }
  if (a.type && b.type)         { score += a.type === b.type ? 1 : 0;          factors++; }
  if (a.material && b.material) { score += a.material === b.material ? 1 : 0;  factors++; }
  if (a.age_group && b.age_group) { score += a.age_group === b.age_group ? 1 : 0; factors++; }
  if (a.gender && b.gender)     { score += a.gender === b.gender ? 1 : 0;      factors++; }
  if (a.price && b.price)       { score += priceSimilar(a.price, b.price) ? 1 : 0; factors++; }

  return factors === 0 ? 0 : score / factors;
}

function detectDuplicates(products, threshold = 0.8) {
  const groups = [];
  const visited = new Set();

  for (let i = 0; i < products.length; i++) {
    if (visited.has(i)) continue;
    const duplicates = [];

    for (let j = i + 1; j < products.length; j++) {
      if (visited.has(j)) continue;
      const score = duplicateScore(products[i], products[j]);
      if (score >= threshold) {
        duplicates.push({
          product_id: products[j].product_id,
          similarity_score: +score.toFixed(2)
        });
        visited.add(j);
      }
    }

    if (duplicates.length > 0) {
      groups.push({
        canonical_product_id: products[i].product_id,
        duplicates
      });
      visited.add(i);
    }
  }
  return groups;
}

module.exports = { detectDuplicates };