import { useRouter } from 'next/router';
import React from 'react'
import Checkout from '../../components/Payments/Checkout'

 function Pay({order}) {

  const router = useRouter()
  console.log(router.query.order);

    return (
        <Checkout order={order} />
    )
}

Pay.getInitialProps = async (context,client) => {
   const {order} = context.query;
   const {data} = await client.get(`/api/orders/${order}`)
   return {order: data}
};

export default Pay