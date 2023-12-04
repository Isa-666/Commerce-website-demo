import React from 'react'
import styles from "./Profile.module.css"
import UserInfo from '../UserInfo/UserInfo'
const Profile = () => {
  return (
    <div className={styles.UserInfoWrapper}>
            <UserInfo/>
    </div>
  )
}

export default Profile