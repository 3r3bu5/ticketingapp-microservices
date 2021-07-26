import Link from 'next/link'
const LandingPage = ({ currentUser,tickets }) => {
  const TicketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>

          <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
            <a className='btn btn-primary' >Details</a>
          </Link>
        </td>
      </tr>
    )
  })
  return (
    <>
    <h2>Tickets</h2>
    <table className='table'>
  <thead>
    <tr>
      <th>Title</th>
      <th>price</th>
      <th>link</th>
    </tr>
  </thead>
  <tbody>
   {TicketList}
  </tbody>
</table>
    </>
  )
};

LandingPage.getInitialProps = async (context,client,currentUser) => {
  const {data} = await client.get('/api/tickets')
  return {tickets : data}
};

export default LandingPage;
