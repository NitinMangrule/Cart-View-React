import * as React from 'react';

const Product = ({ title, id, image, price, quantity }) => {
  return (
    <li key={id} className="cart-item">
      <div className="cart-item-info">
        <h3>{title}</h3>
        <p>Quantity: {quantity}</p>
        <p>Base Price: ${price}</p>
      </div>
      <div className="cart-item-image">
        <img src={image} alt={title} />
      </div>
    </li>
  );
};

export default Product;
