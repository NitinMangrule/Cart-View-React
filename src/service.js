export const getCartInfo = (userId) => {
  return fetch(`https://fakestoreapi.com/carts/${userId}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(() => new Error('No data found!'));
};

export const getProductById = (productId) => {
  return fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .catch(() => new Error('No data found!'));
};

export const getTotalCartPrice = (data) => {
  return data.reduce((total, item) => total + item.price * item.quantity, 0);
};
