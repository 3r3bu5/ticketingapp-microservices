import React from "react";
import {
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {InjectedCheckoutForm} from './CheckoutForm'
const Checkout = ({order}) => {
    console.log(order, "asdsa")
  const stripe = loadStripe('pk_test_51IhhrPAwETyqVyUT1XwFTuGIX7YbZKqyfUi5cuW71SNnJeuh11hkNdYkwc9vFzctsCVqbdZ1bKaqgNP4nQhUyB9d005lDKC2Ve');
  return (
    <Elements stripe={stripe}>
      <InjectedCheckoutForm order={order} />
    </Elements>
  );
};

export default Checkout;