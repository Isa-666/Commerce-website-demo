import React from "react";
import styles from "./Footer.module.css";
import shopLogo from "./Assets/shoplogo.png";
import { FiInstagram } from "react-icons/fi";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaTiktok } from "react-icons/fa";
import FooterSlider from "./FooterSlider";

const Footer = () => {
  return (<>
  <FooterSlider/>
    <div className={styles.FooterFundament}>
      <div className={styles.contactSection}>
        <div className={styles.logosContainer}>
          <img className={styles.LogoImage} src={shopLogo} alt="" />
          <div>
            <span>
              <FiInstagram className={styles.aboutUsLogo} />
            </span>
            <span>
              <BiLogoFacebookSquare className={styles.aboutUsLogo} />
            </span>
            <span>
              <FaTiktok className={styles.aboutUsLogo} />
            </span>
          </div>
        </div>
        <div className={styles.SupportSection}>
        <span>Support</span>
          <ul className={styles.supportSectionTexts}><li>FAQ</li>
          <li>Delivery service</li>
          <li>Refund terms</li>
          </ul>
        </div>
        <div className={styles.ContactSection}>
          <span>Contact</span>
          <ul className={styles.ContactSectionTexts}><li>M. K. Example, Example City, 28 A</li>
          <li>example@gmail.com</li>
          <li>*2081</li>
          </ul>
        </div>
      </div>
      <div className={styles.LastTextFooter}>ⓒ Copyright
PeojectX 2021.All rights reserved. <div className={styles.TwoLastTexts}><span>Terms and conditions</span><span>Privacy policy</span></div></div>
    </div>
    </>
  );
};

export default Footer;
