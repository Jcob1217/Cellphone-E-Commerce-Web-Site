import React, { useEffect, useState } from "react";
import "./product.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import ImageSlider from "./imageSlider/ImageSlider";
import ShippingInfo from "./shippingInfo/ShippingInfo";
import ProductSpecification from "./productSpecification/ProductSpecification";

function Product() {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useQuery(["product"], () => {
    return axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((response) => {
        return response.data;
      });
  });

  if (isFetching || isLoading) {
    return <Loading />;
  }

  const productInfo = data.product_info[0];
  const productImages = data.product_images;

  return (
    <div className="product-page">
      <div className="left">
        <div className="product-name">{productInfo.product_name}</div>
        <ImageSlider images={productImages} />
        <ProductSpecification productInfo={productInfo} />
      </div>
      <div className="right">
        <ShippingInfo productInfo={productInfo} />
      </div>
    </div>
  );
}

export default Product;
