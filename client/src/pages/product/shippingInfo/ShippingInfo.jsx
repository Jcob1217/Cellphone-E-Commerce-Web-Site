import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplaySharpIcon from "@mui/icons-material/ReplaySharp";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./shippingInfo.scss";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { handleUnauthenticatedRedirect } from "../../../utils/redirectUtils";

const ShippingInfo = ({ productInfo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  const handleClick = () => {
    if (!currentUser) {
      handleUnauthenticatedRedirect(navigate, location.pathname);
    } else {
      axios
        .post("http://localhost:3001/api/products/add-to-cart", {
          product_id: productInfo.id,
        })
        .then((res) => {
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
    }
  };

  return (
    <div>
      <div className="price">{`$${productInfo.product_price.toFixed(2)}`}</div>
      <div className="adjust-installemnts">
        <AccountBalanceWalletIcon />
        <div>Adjust installments</div>
      </div>
      <div className="in-stock-container">
        <InventoryIcon />
        <div>Left in stock: {productInfo.in_stock}</div>
      </div>
      <div className="send-info">
        <LocalShippingIcon />
        <div>Order today, ship tommorow</div>
      </div>
      <div className="return-info">
        <ReplaySharpIcon />
        <div>Return within 14 days</div>
      </div>
      <button onClick={handleClick}>Add to cart</button>
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

export default ShippingInfo;
