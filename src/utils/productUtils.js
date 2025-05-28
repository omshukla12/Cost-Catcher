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

// Group tracked items by category ...
export const getCategoryData = (trackingItems) => {
  const counts = {};
  trackingItems.forEach((item) => {
    const category = item.category || "Other";
    counts[category] = (counts[category] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

// Extract all product IDs from tracking list ...
export const extractProductIds = (apiResponse) => {
  if (!apiResponse || !Array.isArray(apiResponse.trackinglist)) return [];
  return apiResponse.trackinglist.map((item) => item._id);
};

// Fetching discount data ...
export const getMaxDiscountData = (testData) => {
  if (!testData) return [];
  return Object.entries(testData)
    .map(([productId, historyArr]) => {
      if (!Array.isArray(historyArr) || historyArr.length === 0) return null;

      const maxDiscount = Math.max(
        ...historyArr.map((h) => Number(h.discount) || 0)
      );
      return {
        productId,
        maxDiscount,
      };
    })
    .filter(Boolean);
};

// Data transformations for drawing insights ...
export const processAnalyticsData = (testData) => {
  const categoryDistribution = [];
  const averageDiscounts = [];
  const topDiscounts = [];
  const priceTrends = [];
  const categoryMap = {};

  for (const productId in testData) {
    const entry = testData[productId];

    if (!entry || !entry.category || !Array.isArray(entry.priceHistory))
      continue;
    const category = entry.category || "Uncategorised";

    if (!categoryMap[category]) categoryMap[category] = [];
    entry.priceHistory.forEach((h) => {
      categoryMap[category].push({ ...h, product_id: productId });
    });
  }

  for (const categoryName in categoryMap) {
    const items = categoryMap[categoryName];
    if (!items.length) continue;

    categoryDistribution.push({
      name: categoryName,
      value: items.length,
    });

    const totalDiscount = items.reduce(
      (sum, item) => sum + parseFloat(item.discount),
      0
    );
    const avgDiscount = totalDiscount / items.length;

    averageDiscounts.push({
      name: categoryName,
      discount: avgDiscount.toFixed(2),
    });

    items.forEach((item) => {
      priceTrends.push({
        time: new Date(item.time).toLocaleString(),
        product_id: item.product_id,
        deal_price: parseFloat(item.deal_price),
        original_price: parseFloat(item.original_price),
      });

      topDiscounts.push({
        product_id: item.product_id,
        discount: parseFloat(item.discount),
      });
    });
  }
  topDiscounts.sort((a, b) => b.discount - a.discount);

  return {
    priceTrends,
    averageDiscounts,
    categoryDistribution,
    topDiscounts: topDiscounts.slice(0, 5),
  };
};
