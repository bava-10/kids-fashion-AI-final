"use strict";

const { calcValueScore } = require("./priceService");

// Task 9: Query Parser
const GENDER_WORDS = {
  girl: "girls", girls: "girls", boy: "boys", boys: "boys",
  unisex: "unisex", kids: "unisex", children: "unisex", baby: "unisex"
};

const SEASON_WORDS = {
  summer: "summer", hot: "summer", winter: "winter",
  cold: "winter", monsoon: "monsoon", rain: "monsoon", festive: "festive"
};

const INTENT_WORDS = {
  comfort: "comfort", comfortable: "comfort", party: "party",
  school: "schoolwear", sport: "sportswear", casual: "casual",
  warm: "winter_comfort", gift: "gift"
};

const OCCASION_WORDS = {
  party: "party", school: "schoolwear", casual: "casual",
  sport: "sportswear", festive: "festive", ethnic: "ethnic"
};

function parseQuery(query) {
  if (!query) return {};
  const q = query.toLowerCase();
  const tokens = q.split(/\s+/);

  // Extract age
  let age = null;
  const ageMatch = q.match(/(\d+)\s*-?\s*(\d+)?\s*(year|yr|y\b|month|mo)/i);
  if (ageMatch) age = ageMatch[2] ? `${ageMatch[1]}-${ageMatch[2]}` : ageMatch[1];
  if (!age && q.includes("toddler")) age = "1-3";
  if (!age && q.includes("infant"))  age = "0-1";
  if (!age && q.includes("newborn")) age = "0";

  let gender = null;
  for (const t of tokens) {
    if (GENDER_WORDS[t]) { gender = GENDER_WORDS[t]; break; }
  }

  let season = null;
  for (const t of tokens) {
    if (SEASON_WORDS[t]) { season = SEASON_WORDS[t]; break; }
  }

  let intent = null;
  for (const t of tokens) {
    if (INTENT_WORDS[t]) { intent = INTENT_WORDS[t]; break; }
  }

  let occasion = null;
  for (const t of tokens) {
    if (OCCASION_WORDS[t]) { occasion = OCCASION_WORDS[t]; break; }
  }

  return {
    query,
    age,
    gender: gender || "unisex",
    season,
    intent,
    occasion
  };
}

// Task 10: Ranking Logic
function ageMatch(productAge, queryAge) {
  if (!productAge || !queryAge) return 0.5;
  const pNum = parseInt(productAge);
  const qNum = parseInt(queryAge);
  if (isNaN(pNum) || isNaN(qNum)) return 0.5;
  return Math.abs(pNum - qNum) <= 1 ? 1 : 0;
}

function rankProducts(products, parsedQuery) {
  return products
    .map(p => {
      const value    = calcValueScore(p);
      const ageFit   = ageMatch(p.age_group, parsedQuery.age);
      const genderOk = !parsedQuery.gender ||
                       parsedQuery.gender === "unisex" ||
                       p.gender === parsedQuery.gender ||
                       p.gender === "unisex" ? 1 : 0;
      const seasonOk = !parsedQuery.season ||
                       p.season === parsedQuery.season ||
                       p.season === "all_season" ? 1 : 0.5;
      const materialBoost =
        parsedQuery.intent === "comfort" &&
        ["cotton", "organic_cotton"].includes(p.material) ? 0.1 : 0;

      const score = parseFloat(
        ((value * 0.40) + (ageFit * 0.25) +
         (genderOk * 0.20) + (seasonOk * 0.15) + materialBoost).toFixed(2)
      );

      return { ...p, rank_score: score };
    })
    .filter(p => p.rank_score > 0)
    .sort((a, b) => b.rank_score - a.rank_score);
}

// Task 11: Substitution Engine
function findSubstitutes(outOfStockProduct, allProducts, count = 3) {
  return allProducts
    .filter(p =>
      p.product_id !== outOfStockProduct.product_id &&
      p.type       === outOfStockProduct.type &&
      p.gender     === outOfStockProduct.gender
    )
    .map(p => {
      let score = 0;
      if (p.age_group === outOfStockProduct.age_group) score += 0.4;
      if (p.material  === outOfStockProduct.material)  score += 0.3;
      if (p.season    === outOfStockProduct.season)    score += 0.2;
      if (p.occasion  === outOfStockProduct.occasion)  score += 0.1;
      return { ...p, substitute_score: parseFloat(score.toFixed(2)) };
    })
    .sort((a, b) => b.substitute_score - a.substitute_score)
    .slice(0, count);
}

module.exports = { parseQuery, rankProducts, findSubstitutes };