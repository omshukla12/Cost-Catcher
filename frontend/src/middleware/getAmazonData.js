export async function getAmazonData(productId) {
  try {
    const url = `${process.env.REACT_APP_ALT_API}/${productId}`;
    const resp = await fetch(url);

    if (resp.status !== 200) {
      return null;
    }

    const data = await resp.json();
    if (
      data.product_id &&
      data.title &&
      data.original_price &&
      data.deal_price &&
      data.product_url &&
      data.image_url &&
      data.store &&
      data.discount &&
      data.category
    ) {
      return data;
    }
  } catch (e) {
    console.error("Error in amazon API: " + e);
  }
  return null;
}
