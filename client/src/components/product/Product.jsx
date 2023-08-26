import React, { useEffect, useContext } from "react";
import "./product.scss";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { handleUnauthenticatedRedirect } from "../../utils/redirectUtils";

const Product = ({ product, inCart, currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(inCart);
  const { id, product_name, product_price, product_image, brand } = product;

  const handleClick = () => {
    if (!currentUser) {
      handleUnauthenticatedRedirect(navigate, location.pathname);
    } else {
      const updateData = { product_id: id, quantity: 1 };
      try {
        axios
          .post("http://localhost:3001/api/cart/update", updateData)
          .then((res) => {
            setIsInCart(!isInCart);
            toast.success(res.data, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="product">
      <div className="product-details">
        <Link to={`/product/${id}`}>
          <img src={product_image} />
          <div>{product_name}</div>
        </Link>
      </div>
      <div className="product-bottom">
        <div className="product-price">{`$${product_price}`}</div>
        <div className="add-to-cart-button" onClick={handleClick}>
          {isInCart ? (
            <RemoveShoppingCartOutlinedIcon fontSize="inherit" />
          ) : (
            <AddShoppingCartIcon fontSize="inherit" />
          )}
        </div>
      </div>
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

export default Product;
