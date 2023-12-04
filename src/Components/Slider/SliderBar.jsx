import React from 'react';
import styles from "./SliderBar.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import PhotoTwo from "./Assets/on.jpg"
import PhotoThree from "./Assets/BlackFriday.jpg"
import PhotoFour from "./Assets/Black.jpg"
const SliderBar = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    
    appendDots: dots => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    }

  };
  return (
    <div className={styles.SliderFundament}>
<Slider className={styles.SliderContainer} {...settings} >
<img className={styles.image} src={PhotoTwo} alt='' />
<img className={styles.image} src={PhotoThree} alt='' />
<img className={styles.image} src={PhotoFour} alt='' />
</Slider>
        </div>
  )
}

export default SliderBar