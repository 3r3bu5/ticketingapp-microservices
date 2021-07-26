import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import Router from 'next/router';
import { useState } from 'react';
import useRequest from '../../hooks/use-request';

function CheckoutForm({order, elements, stripe}) {
  const {doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      Router.push('/orders/')
    }
  })
  const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make  sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);

      if (result.error) {
        // Show error to your customer.
        console.log(result.error.message);
      } else {
        await doRequest({token: result.token.id })
      }
    };
    return (
      <form className='mt-5' onSubmit={handleSubmit}>
        <h4>Pay {order.ticket.price}$ for the ticket</h4>
        <CardElement />
        {errors}
        <button className='mt-2 btn btn-primary' type="submit" disabled={!stripe}>
          Pay {order.ticket.price}$
        </button>
      </form>
    );
}

export const InjectedCheckoutForm = ({order}) => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CheckoutForm elements={elements} order={order} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

