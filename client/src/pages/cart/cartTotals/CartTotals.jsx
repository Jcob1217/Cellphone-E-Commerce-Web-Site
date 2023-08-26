import React, { useContext, useState, useEffect } from "react";
import "../cart.scss";

const CartTotals = ({subtotal, shippingMethod, chooseShipping, shippingCost}) => {
  return (
    <div className="right">
      <div className="cart-totals">Cart totals</div>
      <div className="subtotal">
        <div>Subtotal</div>
        <div>{`$${subtotal}`}</div>
      </div>
      <div className="shipping">
        <div>Shipping</div>
        <div className="shipping-methods">
          <div>
            <div>
              <label htmlFor="free">Free shipping</label>
              <input
                type="radio"
                id="free"
                name="shippingMethod"
                value="free"
                checked={shippingMethod === "free"}
                onChange={chooseShipping}
              />
            </div>

            <div>
              <label htmlFor="premium">Premium: $10.00</label>
              <input
                type="radio"
                id="premium"
                name="shippingMethod"
                value="premium"
                checked={shippingMethod === "premium"}
                onChange={chooseShipping}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="total">
        <div>Total</div>
        <div>{`$${subtotal + shippingCost}`}</div>
      </div>
      <button>Proceed to checkout</button>
    </div>
  );
};

export default CartTotals;
