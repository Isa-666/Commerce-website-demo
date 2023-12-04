import { configureStore } from "@reduxjs/toolkit";
import { basketReducer } from "./reducers/BasketReducers";

export default configureStore({
    reducer: {
      basketProducts: basketReducer, 
     
    }
  })