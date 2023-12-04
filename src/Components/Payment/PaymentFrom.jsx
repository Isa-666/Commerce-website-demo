import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import styles from "./Payment.module.css";
const PaymentFrom = () => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:5173/payment", {
          amount: 1000,
          id,
        });
        if (response.data.success) {
          console.log("Succesful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.fundament}>
      {!success ? (
        <div className={styles.PaymentFormFundament}>
            <div className={styles.paymentText}><h2>Payment Section</h2></div>
        <form className={styles.PaymentFormWrapper} onSubmit={handleSubmit}>
            <div>
            <CardElement />
            </div>
        </form>
        <button className={styles.PayBtn}>Pay</button>
        </div>
      ) : (
        <div>Success!</div>
      )}
    </div>
  );
};

export default PaymentFrom;
