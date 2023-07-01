import * as React from 'react';
import Product from './Product';
import { getTotalCartPrice } from './service';

const Cart = ({ productList }) => {
  return (
    <>
      <ul className="cart-items">
        {productList.map((item) => (
          <Product
            title={item.title}
            price={item.price}
            key={item.id}
            quantity={item.quantity}
            image={item.image}
          />
        ))}
      </ul>
      <h2>Total Cart Value: $ {getTotalCartPrice(productList)}</h2>
    </>
  );
};

export default Cart;
