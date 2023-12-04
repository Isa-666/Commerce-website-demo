import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { commerce } from '../../API/commerce';
const ExchangeToken = () => {
    
    const navigate = useNavigate();
    const { token } = useParams();
    useEffect(() => {
      commerce.customer.getToken(token).then(() => navigate("/"));
    }, [token]);
    
    return (
    <></>
  )
}

export default ExchangeToken