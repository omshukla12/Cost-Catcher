export const extractProductID = (url) => {
  const dpPattern = /\/dp\/([A-Z0-9]{10})/;
  const gp1Pattern = /\/gp\/product\/([A-Z0-9]{10})/;

  let match = url.match(dpPattern) || url.match(gp1Pattern);
  return match ? match[1] : null;
};
