// Extracting product ID from URL ...
export const extractProductID = (url) => {
  const dpPattern = /\/dp\/([A-Z0-9]{10})/;
  const gp1Pattern = /\/gp\/product\/([A-Z0-9]{10})/;

  let match = url.match(dpPattern) || url.match(gp1Pattern);
  return match ? match[1] : null;
};

// Parsing starting dates of sales ...
export const getStartDate = (duration) => {
  if (!duration) return new Date(0);

  const firstRange = duration.split(";")[0].trim();
  const match = firstRange.match(/([A-Za-z]+)\s*(\d{1,2})/);
  const yearMatch = firstRange.match(/(\d{4})/);

  if (match && yearMatch) {
    return new Date(`${match[1]} ${match[2]}, ${yearMatch[1]}`);
  }
  return new Date(0);
};

// Parsing ending dates of sales ...
export const getEndDate = (duration) => {
  if (!duration) return new Date(0);

  const firstRange = duration.split(";")[0].trim();
  const rangeMatch = firstRange.match(
    /([A-Za-z]+)\s*(\d{1,2})-(\d{1,2}),\s*(\d{4})/
  );

  if (rangeMatch) {
    return new Date(`${rangeMatch[1]} ${rangeMatch[3]}, ${rangeMatch[4]}`);
  }
  return getStartDate(duration);
};
