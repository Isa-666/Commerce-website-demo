import React from 'react'
import MainContent from '../../Components/Content/MainContent'
import styles from './HomePage.module.css'
import SliderArticle from '../../Components/SliderArticle/SliderArticle'
import Article from '../../Components/Article/Article'
import SliderBar from '../../Components/Slider/SliderBar'

const HomePage = () => {

  return (<div className={styles.HomePageContentWrapper}>
    <SliderBar/>
    <div className={styles.HomePageContent}>
<MainContent props={"mobile-devices"} text={"Latest mobile smartphones" } />
    <SliderArticle/>
  <MainContent props={"accessories"} text={"New accessories" }/>
    <MainContent props={"macbooks"} text={"MacBooks"}/>
    <Article/>
    </div>
    </div>
  )
}

export default HomePage;
