export const triggerAddToCart = (product) => {
  // Dispatch custom event for cart animation
  const event = new CustomEvent('cartUpdate', {
    detail: {
      type: 'ADD_TO_CART',
      product
    }
  });
  window.dispatchEvent(event);
  
  // You can return a promise if you need to wait for the animation
  return new Promise(resolve => setTimeout(resolve, 500));
};
