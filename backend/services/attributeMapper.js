const rules = require("../utils/attributeRules");

function findMatch(text, ruleSet) {
  for (const key in ruleSet) {
    const keywords = ruleSet[key];

    for (const word of keywords) {
      if (text.includes(word)) {
        return key;
      }
    }
  }

  return null;
}

function extractAge(text) {
  for (const age of rules.agePatterns) {
    if (text.includes(age)) {
      return age + " years";
    }
  }

  return null;
}

function mapAttributes(productText) {
  const text = productText.toLowerCase();

  return {
    gender: findMatch(text, rules.gender),
    type: findMatch(text, rules.type),
    material: findMatch(text, rules.material),
    age: extractAge(text)
  };
}

module.exports = mapAttributes;