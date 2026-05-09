"use strict";

const BRAND_ALIASES = {
  "hopscotch":  ["hopscoth", "hopscotchh", "hopscotc"],
  "fabindia":   ["fab india", "fab-india", "fabindaia"],
  "zara":       ["zara kids", "zarakids"],
  "h&m":        ["h and m", "h&m kids", "hm"],
  "mothercare": ["mother care", "mother-care"],
  "firstcry":   ["first cry", "1stcry"]
};

const VALID_GENDERS   = ["boys", "girls", "unisex"];
const VALID_MATERIALS = ["cotton","polyester","wool","denim","silk","linen","fleece","nylon","rayon","blended","organic_cotton"];
const VALID_OCCASIONS = ["casual","party","schoolwear","ethnic","sportswear","nightwear","festive"];
const VALID_SEASONS   = ["summer","winter","monsoon","all_season","festive"];

function normalizeBrand(brand) {
  if (!brand) return null;
  const lower = brand.toLowerCase().trim();
  for (const [canonical, aliases] of Object.entries(BRAND_ALIASES)) {
    if (lower === canonical || aliases.includes(lower)) return canonical;
  }
  return lower;
}

function normalizeAge(raw) {
  if (!raw) return null;
  const s = String(raw).toLowerCase().trim();
  const rangeYear  = s.match(/(\d+)\s*-\s*(\d+)\s*(y|yr|yrs|year|years)/);
  const singleYear = s.match(/^(\d+)\s*(y|yr|yrs|year|years)$/);
  const rangeMo    = s.match(/(\d+)\s*-\s*(\d+)\s*(m|mo|month|months)/);
  const singleMo   = s.match(/^(\d+)\s*(m|mo|month|months)$/);
  if (rangeYear)  return `${rangeYear[1]}-${rangeYear[2]}Y`;
  if (singleYear) return `${singleYear[1]}Y`;
  if (rangeMo)    return `${rangeMo[1]}-${rangeMo[2]}M`;
  if (singleMo)   return `${singleMo[1]}M`;
  return raw;
}

function cleanPrice(price) {
  if (price === null || price === undefined) return null;
  const num = parseFloat(String(price).replace(/[^0-9.]/g, ""));
  if (isNaN(num) || num <= 0 || num > 100000) return null;
  return num;
}

function cleanProduct(product) {
  const cleaned = {
    product_id: product.product_id || null,
    brand:      normalizeBrand(product.brand),
    type:       product.type || null,
    material:   VALID_MATERIALS.includes((product.material || "").toLowerCase()) ? product.material.toLowerCase() : null,
    gender:     VALID_GENDERS.includes((product.gender || "").toLowerCase()) ? product.gender.toLowerCase() : "unisex",
    occasion:   VALID_OCCASIONS.includes((product.occasion || "").toLowerCase()) ? product.occasion.toLowerCase() : "casual",
    season:     VALID_SEASONS.includes((product.season || "").toLowerCase()) ? product.season.toLowerCase() : "all_season",
    age_group:  normalizeAge(product.age_group),
    price:      cleanPrice(product.price),
    _issues:    []
  };

  if (!cleaned.type)      cleaned._issues.push("missing_type");
  if (!cleaned.material)  cleaned._issues.push("missing_material");
  if (!cleaned.age_group) cleaned._issues.push("missing_age");
  if (!cleaned.price)     cleaned._issues.push("missing_or_invalid_price");
  if (!cleaned.brand)     cleaned._issues.push("missing_brand");

  return cleaned;
}

function cleanDataset(products) {
  const clean = [];
  const flagged = [];

  for (const p of products) {
    const result = cleanProduct(p);
    if (result._issues.length === 0) {
      clean.push(result);
    } else {
      flagged.push(result);
    }
  }

  return {
    version: "v1",
    total: products.length,
    clean_count: clean.length,
    flagged_count: flagged.length,
    clean,
    flagged
  };
}

module.exports = { cleanDataset };