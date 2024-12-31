export async function getAmazonData(productId) {
  try {
    const url = `${process.env.REACT_APP_PA_API}?id=${productId}`;
    const resp = await fetch(url);
    if (resp.status !== 200) {
      return null;
    }
    const data = await resp.json();
    if (
      data.product_id &&
      data.title &&
      data.price &&
      data.discount_price &&
      data.link &&
      data.image_link &&
      data.product_category &&
      data.store &&
      data.discount
    ) {
      data.product_logo =
        "https://res.cloudinary.com/buysmart/image/upload/v1642522850/Amazon_icon_t0l2hf.png";
      data.product_full_logo =
        "https://res.cloudinary.com/buysmart/image/upload/v1642522850/amazonfull_rovocm.png";
      return data;
    }
  } catch (e) {
    console.error("Error in amazon API: " + e);
  }
  return null;
}
