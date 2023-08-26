import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.scss";
import Product from "../../components/product/Product";
import Loading from "../../components/loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Home = ({ currentUser }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = () => {
    if (currentUser) {
      axios.get("http://localhost:3001/api/cart").then((res) => {
        setCartItems(res.data);
      });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [currentUser]); // Wywołaj fetchCartItems po zmianie currentUser

  const { data, isLoading, isFetching } = useQuery(["product"], () => {
    return axios
      .get("http://localhost:3001/api/products/list")
      .then((response) => response.data);
  });

  if (isFetching || isLoading) {
    return <Loading />;
  }

  return (
    <div className="home">
      {data.map((product, key) => {
        let inCart = false;
        cartItems.forEach((cartItem) => {
          if (cartItem.product_id === product.id) {
            inCart = true;
          }
        });
        return (
          <Product
            key={key}
            product={product}
            inCart={inCart}
            currentUser={currentUser}
            fetchCartItems={fetchCartItems} // Przekazujemy funkcję do aktualizacji
          />
        );
      })}
    </div>
  );
};

export default Home;
