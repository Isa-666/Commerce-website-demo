import React from 'react'
import { loadStripe } from 'react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentFrom from './PaymentFrom';

const PUBLICK_STRIPE_KEY=('pk_test_51OEyDkErPTT5WuaYHW5HLQbiR95kRGKpqH9S9okYhANhzDg5jCQ2v4NjVE2ePvkkb5wjuYLGz8WomuT0QERF6wYD00zlHfKUGY');

const stripeTestPromise= loadStripe(PUBLICK_STRIPE_KEY)
const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
<PaymentFrom/>
    </Elements>
  )
}

export default StripeContainer