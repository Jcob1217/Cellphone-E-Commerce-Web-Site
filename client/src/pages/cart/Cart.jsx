import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loading/Loading";
import Product from "./product/Product";
import CartTotals from "./cartTotals/CartTotals";
import axios from "axios";
import "./cart.scss";

const Cart = () => {
  const [quantities, setQuantities] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [shippingCost, setShippingCost] = useState(0);
  const [cartData, setCartData] = useState([]);

  const { data, isLoading, isFetching } = useQuery(["item"], () => {
    return axios
      .get("http://localhost:3001/api/cart")
      .then((response) => response.data);
  });

  useEffect(() => {
    setCartData(data);
  }, [data]);

  useEffect(() => {
    if (shippingMethod === "premium") {
      setShippingCost(10);
    } else {
      setShippingCost(0);
    }
  }, [shippingMethod]);

  useEffect(() => {
    if (data) {
      setQuantities([]);
      let calculatedSubtotal = 0;
      data.forEach((value) => {
        calculatedSubtotal += value.product_price * value.quantity;
        setQuantities((oldArray) => [
          ...oldArray,
          { product_id: value.product_id, quantity: value.quantity },
        ]);
      });
      setSubtotal(calculatedSubtotal);
    }
  }, [data]);

  if (isFetching || isLoading) {
    return <Loading />;
  }

  const updateCart = () => {
    const dataToRemove = quantities.filter(
      (element) => Number(element.quantity) === 0
    );

    axios
      .put("http://localhost:3001/api/cart/update", quantities)
      .then((res) => {
        toast.success(res.data.info, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const updatedData = res.data.data;
        let updatedSubtotal = 0;
        updatedData.forEach((value) => {
          updatedSubtotal += value.product_price * value.quantity;
        });
        setSubtotal(updatedSubtotal);
      });

    dataToRemove.forEach((value) => {
      setCartData((prevState) =>
        prevState.filter((item) => item.product_id !== value.product_id)
      );
    });
  };

  const removeProduct = (details) => {
    axios
      .post("http://localhost:3001/api/cart/update", {
        product_id: details.product_id,
      })
      .then((res) =>
        toast.success(res.data, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );

    setCartData((prevState) =>
      prevState.filter((item) => item.product_id !== details.product_id)
    );

    setSubtotal(subtotal - details.product_price * details.quantity);
  };

  const chooseShipping = (e) => {
    setShippingMethod(e.target.value);
  };

  return (
    <div className="cart-page">
      <div className="left">
        <div className="grid-container">
          <div className="header">Shopping cart</div>
          <div></div>
          <div></div>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
          {cartData?.map((value, key) => (
            <Product
              key={key}
              details={value}
              quantities={quantities}
              setQuantities={setQuantities}
              removeProduct={removeProduct}
            />
          ))}
        </div>
        <button onClick={updateCart}>Update cart</button>
      </div>
      <CartTotals
        subtotal={subtotal}
        shippingCost={shippingCost}
        shippingMethod={shippingMethod}
        chooseShipping={chooseShipping}
      />
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;
