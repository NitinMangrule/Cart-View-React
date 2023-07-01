import React, { useEffect, useState } from 'react';
import './style.css';
import Cart from './Cart';
import { getCartInfo, getProductById } from './service';
export default function App() {
  const userId = 1;
  const [cartData, setCartData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async function () {
    try {
      // Fetch cart details
      const cartResponse = await getCartInfo(userId);
      setCartData(cartResponse.products);

      // Extract product IDs and quantities from the cart data
      const cartItems = cartResponse.products;
      const productIds = cartItems.map((item) => item.productId);
      const quantities = cartItems.map((item) => item.quantity);

      // Fetch product details incrementally
      const batchSize = 1; // Number of products to fetch in each batch
      const totalBatches = Math.ceil(productIds.length / batchSize);
      let productData = [];
      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const batchProductIds = productIds.slice(
          batchIndex * batchSize,
          (batchIndex + 1) * batchSize
        );

        const batchPromises = batchProductIds.map(async (productId) => {
          const productResponse = await getProductById(productId);
          return productResponse;
        });

        const batchProductResponses = await Promise.all(batchPromises);

        // Combine product details with quantities
        const productsWithQuantities = batchProductResponses.map(
          (product, index) => ({
            ...product,
            quantity: quantities[batchIndex * batchSize + index],
          })
        );
        productData.push(...productsWithQuantities);
      }
      setProductData(productData);

      // Set loading state to false once all products are fetched
      setLoading(false);

      // Process the data or update state as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cart Details</h1>

      {loading ? (
        <p>Loading product details...</p>
      ) : cartData ? (
        <Cart productList={productData} />
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
