import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './EditLinks.css';  
import { ImageOnly} from "../../../Config/Logos";

const ImageSlider = ({AddSocial}) => {
  const sliderRef = useRef(null);  // Reference to the slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 7, 
    slidesToScroll: 1
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
      <Slider ref={sliderRef} {...settings}>
        {ImageOnly.map((image, index) => (
          <div key={index}>
            <img 
              style={{height:"65px",width:"65px",borderRadius:"2ch",objectFit:"cover"}}
              src={image} 
              alt={`Slide ${index}`} 
              className="slider-img"
              onClick={() => {
                AddSocial(index);
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
