import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { StyledEngineProvider } from '@mui/material/styles';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from 'react-stripe-js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>
);
