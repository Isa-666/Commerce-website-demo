import React from 'react'
import styles from "./Profile.module.css"
import UserInfo from '../UserInfo/UserInfo'
import GoBackButton from '../../Components/Button/GoBackButton'
const Profile = () => {
  return (
    <div className={styles.UserInfoWrapper}>
      <GoBackButton/>
            <UserInfo/>
    </div>
  )
}

export default Profile