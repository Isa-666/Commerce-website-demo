import React from 'react'
import styles from "./FooterSlider.module.css"
import AcerLogo from "./Assets/acer.png"
import PhilipsLogo from "./Assets/Rectangle 154 (1).png"
import HPLogo from "./Assets/Rectangle 154 (2).png"
import ElectroLuxLogo from "./Assets/Rectangle 154 (3).png"
import GorenjeLogo from "./Assets/Rectangle 154 (4).png"
import BoschLogo from "./Assets/Rectangle 154 (5).png"
import ToshibaLogo from "./Assets/Rectangle 154.png"
import Slider from "react-slick";
const FooterSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 3500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className={styles.SliderWrapper}><Slider className={styles.SliderContainer} {...settings}>
 <div className={styles.ImageContainer}><img className={styles.Image} src={AcerLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={PhilipsLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={HPLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={ElectroLuxLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={GorenjeLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={BoschLogo} alt=''/></div>
 <div className={styles.ImageContainer}><img className={styles.Image} src={ToshibaLogo} alt=''/></div>
        </Slider></div>
  )
}

export default FooterSlider