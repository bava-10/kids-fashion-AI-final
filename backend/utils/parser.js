function normalizeAge(age) {
  if (!age) return "";

  age = age.toLowerCase();

  if (age.includes("yrs")) {
    age = age.replace("yrs", "years");
  }

  if (age.includes("y")) {
    age = age.replace("y", "years");
  }

  return age;
}

function extractAttributes(text) {
  const lower = text.toLowerCase();

  let brand = "";
  let type = "";
  let material = "";
  let age_group = "";
  let price = "";

  // PRICE
  const priceMatch = lower.match(/\d{3,5}/);
  if (priceMatch) price = Number(priceMatch[0]);

  // BRAND (simple rule: last capital word often brand in dataset)
  const words = text.split(" ");
  brand = words.find(w => /^[A-Z]/.test(w)) || "";

  // TYPE
  if (lower.includes("frock")) type = "Frock";
  else if (lower.includes("t-shirt") || lower.includes("tshirt")) type = "T-Shirt";
  else if (lower.includes("shorts")) type = "Shorts";

  // MATERIAL
  if (lower.includes("cotton")) material = "Cotton";
  else if (lower.includes("denim")) material = "Denim";

  // AGE GROUP NORMALIZATION
  const ageMatch = lower.match(/\d+\s*-\s*\d+|\d+\s*y/);
  if (ageMatch) {
    age_group = normalizeAge(ageMatch[0]);
  }

  return {
    product_id: Date.now().toString(),
    brand,
    type,
    material,
    age_group,
    price
  };
}

module.exports = extractAttributes;
