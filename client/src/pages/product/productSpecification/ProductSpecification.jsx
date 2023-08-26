import React from "react";
import "./productSpecification.scss"

const ProductSpecification = ({ productInfo }) => {
  return (
    <div className="product-specification">
      <div className="header">Product Specification</div>
      <div className="screen-size">
        <span>Screen size</span>
        <div>{productInfo.screen_size}"</div>
      </div>
      <div className="display-resolution">
        <span>Display resolution</span>
        <div>{productInfo.display_resolution}</div>
      </div>
      <div className="display-type">
        <span>Display</span>
        <div>{productInfo.display_type}</div>
      </div>
      <div className="ram-container">
        <span>Ram</span>
        <div>{`${productInfo.ram} GB`}</div>
      </div>
      <div className="memory">
        <span>Storage</span>
        <div>{`${productInfo.storage} GB`}</div>
      </div>
      <div className="battery">
        <span>Battery</span>
        <div>{`${productInfo.battery} mAh`}</div>
      </div>
      <div className="processor">
        <span>Processor</span>
        <div>{`${productInfo.processor}`}</div>
      </div>
      <div className="camera-rear">
        <span>Rear Camera</span>
        <div>{`${productInfo.camera_rear}`}</div>
      </div>
      <div className="camera-front">
        <span>Front Camera</span>
        <div>{`${productInfo.camera_front}`}</div>
      </div>
    </div>
  );
};

export default ProductSpecification;
