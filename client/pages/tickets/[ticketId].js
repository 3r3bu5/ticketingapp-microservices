import Router from 'next/router';
import React from 'react'
import useRequest from '../../hooks/use-request';
 function TicketShow({ticket}) {
     const {doRequest, errors} = useRequest({
         url: '/api/orders',
         method: 'post',
         body: {
             ticketId: ticket.id
         },
         onSuccess: (order) => {
             Router.push('/orders/[orderId]', `/orders/${order.id}`)
         }   
     })
     const createOrder = async (event) => {
         event.preventDefault()
         await doRequest()
     }
    return (
        <div>
           <h2> {ticket.title} </h2>
           <h4> {ticket.price} </h4>
           {errors}
           <button className='btn btn-primary' onClick={createOrder}> purchase </button>
        </div>
    )
}

TicketShow.getInitialProps = async (context,client) => {
   const {ticketId} = context.query;
   const {data} = await client.get(`/api/tickets/${ticketId}`)
   return {ticket: data}
};


export default TicketShow