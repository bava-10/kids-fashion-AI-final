function normalizeAge(text) {
  text = text.toLowerCase();

  const patterns = [
    { regex: /(\d+)-(\d+)\s?(yrs|years|y)?/, format: "$1-$2 years" },
    { regex: /(\d+)y/, format: "$1 years" }
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern.regex);

    if (match) {
      return pattern.format
        .replace("$1", match[1])
        .replace("$2", match[2] || "");
    }
  }

  return null;
}

module.exports = normalizeAge;