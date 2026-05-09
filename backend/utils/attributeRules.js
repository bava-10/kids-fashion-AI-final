const rules = {
  gender: {
    boys: ["boys", "boy", "male"],
    girls: ["girls", "girl", "female"],
    unisex: ["unisex", "kids"]
  },

  type: {
    "t-shirt": ["t-shirt", "tshirt", "tee"],
    shirt: ["shirt"],
    frock: ["frock", "dress"],
    shorts: ["shorts"],
    jeans: ["jeans"],
    pants: ["pants", "trouser"]
  },

  material: {
    cotton: ["cotton"],
    denim: ["denim"],
    wool: ["wool"],
    polyester: ["polyester"]
  },

  agePatterns: [
    "0-1",
    "1-2",
    "2-3",
    "3-4",
    "4-5",
    "5-6",
    "6-7",
    "7-8",
    "8-9",
    "9-10"
  ]
};

module.exports = rules;