import React from 'react'
import styles from "../LoginNext/LoginNext.module.css"
import MailSend from "../LoginNext/preview.jpg"
const LoginMessage = () => {
  return (
    <div className={styles.LoginWrapper}>
  <img className={styles.LogoMail} src={MailSend} alt=''/>
  <div className={styles.text}>
  Check your email address. Follow the link posted</div>
  </div>
  )
}

export default LoginMessage