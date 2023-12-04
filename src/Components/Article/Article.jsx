import React from "react";
import styles from "./Article.module.css";
import BoxLogo from "./Assets/box.png";
import Cardlogo from "./Assets/card-pos.png";
import StarLogo from "./Assets/medal-star.png";

import { motion} from "framer-motion";

const Article = () => {
    const opacityAnimation = {
        hidden: {
          x: 300,
          opacity: 0,
        },
        hiddenFirst: {
            x: -300,
            opacity: 0,
          },
          hiddenSecond: {
            y: -300,
            opacity: 0,
          },
        visible: {
          x: 0,
          opacity: 1,
        },
        visibleFirst: {
            x: 0,
            opacity: 1,
          },
          visibleSecond: {
            y: 0,
            opacity: 1,
          },
      };
  return (
    <div className={styles.CardFundament}>
    
        <motion.span
             initial="hidden"
             whileInView="visible"
             variants={opacityAnimation}
             transition={{ duration: 1, delay: 0.1 }}
        >
          WHY WE?
        </motion.span>
    
      <div className={styles.CardContainers}>
        <motion.div 
           initial="hiddenFirst"
           whileInView="visibleFirst"
           variants={opacityAnimation}
           transition={{ duration: 0.8, delay: 0.1 }}
        className={styles.CardWrapper}>
          <img className={styles.logo} src={BoxLogo} alt="" />
          <span className={styles.aboutUs}>Free delivery</span>
          <span className={styles.CardWrapperText}>
            FREE delivery to the transport company and shipping throughout the
            country.
          </span>
        </motion.div>
        <motion.div 
           initial="hiddenSecond"
           whileInView="visibleSecond"
           variants={opacityAnimation}
           transition={{ duration: 0.8, delay: 0.1 }}
        className={styles.CardWrapper}>
          <img className={styles.logo} src={Cardlogo} alt="" />
          <span className={styles.aboutUs}>Prices from the manufacturer</span>
          <span className={styles.CardWrapperText}>
            As a manufacturer, we offer the best prices for selling products.
            Almost all prices presented in our online store are wholesale.
          </span>
        </motion.div>
        <motion.div 
        initial="hidden"
        whileInView="visible"
        variants={opacityAnimation}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={styles.CardWrapper}>
          <img className={styles.logo} src={StarLogo} alt="" />
          <span className={styles.aboutUs}>Certification</span>
          <span className={styles.CardWrapperText}>
            All products are required to undergo certification.
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Article;
