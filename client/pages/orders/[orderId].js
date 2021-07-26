import Router from "next/router";
import { useEffect, useState } from "react";

function OrderShow({order}) {
    const [timeLeft, setTimeLeft] = useState(0)
    useEffect(() => {
        
        const findTimeleft = () => {
          const msLeft = new Date(order.expiresAt) - new Date()
          setTimeLeft(Math.round(msLeft / 1000))
        }
       findTimeleft()
       const timerId = setInterval(findTimeleft, 1000);
       return () => {
           clearInterval(timerId)
       }
    }, [])
    const handlePaymentRedirection = (e) => {
        e.preventDefault()
        Router.push({
            pathname : '/payments/pay',
            query: {
                order: order.id
            }
        })
    }
    if (timeLeft < 0) {
         return (
        <div>
            <p> Order Expired </p>
        </div>
    )
    }
    return (
        <div>
            <p> You have {timeLeft} seconds to pay for the order </p>
            <button className='btn btn-primary' onClick={handlePaymentRedirection}>Process to payment</button>
        </div>
    )
}

OrderShow.getInitialProps = async (context,client) => {
   const {orderId} = context.query;
   const {data} = await client.get(`/api/orders/${orderId}`)
   return {order: data}
};
export default OrderShow;