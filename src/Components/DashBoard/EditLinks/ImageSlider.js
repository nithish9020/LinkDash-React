import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './EditLinks.css';  // Import the CSS file

const ImageSlider = () => {
  const sliderRef = useRef(null);  // Reference to the slider

  const images = [
    "https://via.placeholder.com/150", // Replace with actual image URLs
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150"
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 5, 
    slidesToScroll: 1
  };

  return (
    <div style={{ width: "90%", margin: "0 auto", position: "relative" }}>
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            {/* Apply CSS class for image */}
            <img 
              src={image} 
              alt={`Slide ${index}`} 
              className="slider-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
