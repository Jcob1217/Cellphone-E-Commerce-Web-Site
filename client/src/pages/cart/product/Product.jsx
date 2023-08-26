import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Product = ({ details, quantities, setQuantities, removeProduct }) => {
  const [quantity, setQuantity] = useState(details.quantity);
  const [subtotal, setSubtotal] = useState(
    details.product_price * details.quantity
  );

  useEffect(() => {
    const foundQuantity = quantities.find(
      (value) => value.product_id === details.product_id
    );
    if (foundQuantity) {
      setQuantity(foundQuantity.quantity);
    }
  }, [quantities, details]);

  useEffect(() => {
    setSubtotal(quantity * details.product_price);
  }, [quantity]);

  const handleChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input) && input.length < 3) {
      const newQuantity = Number(e.target.value);
      if (newQuantity !== quantity) {
        setQuantity(newQuantity);
        setSubtotal(details.product_price * newQuantity);

        setQuantities((oldArray) => {
          const updatedArray = oldArray.map((value) =>
            value.product_id === details.product_id
              ? { ...value, quantity: newQuantity }
              : value
          );
          return updatedArray;
        });
      }
    }
  };

  return (
    <>
      <div>
        <CloseIcon onClick={() => removeProduct(details)} />
      </div>
      <div>
        <Link to={`/product/${details.id}`}>
          <img src={details.product_image} />
        </Link>
      </div>
      <div>{details.product_name}</div>
      <div className="item-price">{`$${details.product_price}`}</div>
      <div className="quantity">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          size={1}
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div>{`$${subtotal}`}</div>
    </>
  );
};

export default Product;
