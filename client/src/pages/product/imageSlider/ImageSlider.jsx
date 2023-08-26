import React, { useState } from "react";
import "./imageSlider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="image-slider">
      <div onClick={goToPrevious}>
        <ArrowBackIosIcon className="arrow left-arrow" />
      </div>
      <div onClick={goToNext}>
        <ArrowForwardIosIcon className="arrow right-arrow" />
      </div>
      <div className="product-image-container">
        <img className="product-image" src={images[currentIndex].image_url} />
      </div>
      <div className="dots-container">
        {images.map((image, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)}>
            {slideIndex === currentIndex ? (
              <CircleIcon className="dot" />
            ) : (
              <CircleOutlinedIcon className="dot" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
