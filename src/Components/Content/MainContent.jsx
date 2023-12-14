import { useState,useEffect} from "react"
import React from 'react'
import styles from "./MainContent.module.css"
import { commerce } from "../../API/commerce"
import Product from "../Product/Product"
import 'react-loading-skeleton/dist/skeleton.css'
import PacmanLoader from "react-spinners/PacmanLoader"
import { Link } from "react-router-dom"
const MainContent = ({props,text}) => {
const [allProduct, setAllProduct]=useState()
const [loading, setLoading]=useState(false)
async function getAllProducts(){
 
  try {
    const Commerce= await commerce.products.list({
      category_slug: [`${props}`], 
      limit: 4,      
    })
    setAllProduct(Commerce.data);
    setLoading(true)
  } catch (error) {
    console.log(error.message);
  }
}


  
useEffect(() => {
  getAllProducts()

},[])



  return (
    <div className={styles.Categories}>
      <div className={styles.CategoriesText}>{text}<span><Link to={"/ProductsPage/All-Products"} className={styles.LinkStyle}>Go to all</Link></span></div>
    <div className={styles.ProductFundamenta}>
 {loading ? allProduct?.map((el)=>{
  return <div key={el.id}><Product className={styles.ProductContainer } el={el}/></div>
}) : (<div className={styles.LoaderWrapper}><PacmanLoader className={styles.loadingScreen} color="#ffe600" size={50}/></div>)}
    <div className={styles.ziqqot}>asdasda</div></div>
    </div>
  )
}

export default MainContent;
