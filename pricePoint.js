const setPrices = [57, 87, 97, 127];
const sorryText =
  "We're so sorry! This was a marketing study to determine the most viable price point. Please subscribe to our newsletter to find out when Atlas will officially launch!";

/**
 * Sets the price point to a random point for analytics purposes
 * @param {HTMLScriptElement} parent - The HTML Section that hold the HTMLButtonElement
 */
function setPricePoint(parent) {
  if (!parent) {
    return;
  }

  const completedPurchase = document.createElement('p');
  completedPurchase.innerText = sorryText;

  const el = document.createElement('button');
  el.id = 'purchase-cta';
  parent.appendChild(el);

  const randomPrice = setPrices[Math.floor(Math.random() * setPrices.length)];
  el.innerText = `Buy now: $${randomPrice}`;
  el.onclick = () => {
    fetch('https://backend.atlasterrain.com/api/analytics/price', {
      method: 'POST',
      body: JSON.stringify({ price: randomPrice }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then(() => {})
      .catch(console.error);

    parent.removeChild(el);
    parent.appendChild(completedPurchase);
  };
}
