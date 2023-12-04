import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.scss";

const SliderProducts = ({images, currentVariant}) => {
  if (currentVariant?.color?.assets) {
    images = images.filter((el) => {
      return currentVariant?.color?.assets.includes(el.id);
    });
  }
  const settings = {
    customPaging: function (i) {
      return (
        <div className="page">
        <img src={images[i]?.url} alt="product-photo" className="images" />
        </div>
      );
    },
    dots: true,
    infinite: true,
    fade:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
   
  };
  return (
    <div className='product-slider'>
    <Slider className='sliderini' {...settings}>
      {images?.map((el) => {
        return (
          <div className='imageProductWrapper' key={el.id}>
            <img src={el.url} alt="" className="imageProduct" />
          </div>
        );
      })}
    </Slider>
  </div>
  )
}

export default SliderProducts