import React from 'react'
import styles from "./SilderArticle.module.css"
import Slider from "react-slick";
import PhotoTwo from "./Assets/mg.jpg"
import PhotoThree from "./Assets/zoom.jpg"
import PhotoFour from "./Assets/huawei.jpg"
import PhotoSix from "./Assets/samsung-a54-reklama.png"
import PhotoSeven from "./Assets/maxresde.jpg"
import PhotoEight from "./Assets/banner.jpg"
const SliderArticle = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

    
      };

  return (
    <div className={styles.SliderFundament}>
        <Slider arrows={false} className={styles.slidercss} {...settings}>
        <img className={styles.image} src={PhotoTwo} alt='' />
<img className={styles.image} src={PhotoThree} alt='' />
<img className={styles.image} src={PhotoFour} alt='' />
        </Slider>
        <Slider className={styles.slidercss} {...settings} arrows={false}>
        <img className={styles.image} src={PhotoSix} alt='' />
<img className={styles.image} src={PhotoSeven} alt='' />
<img className={styles.image} src={PhotoEight} alt='' />
        </Slider>
        </div>
  )
}

export default SliderArticle