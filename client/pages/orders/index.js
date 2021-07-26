import React from 'react'

function Index({orders}) {
    const ordersList = orders.map((order) => {
        return (
            <li key={order.id}> 
            {order.ticket.title} - {order.status}
             </li>
        )
    })
    return (
        <ul>
            My orders
            {ordersList}
        </ul>
    )
}

Index.getInitialProps = async (context,client) => {
   const {data} = await client.get(`/api/orders/`)
   return {orders: data}
};

export default Index