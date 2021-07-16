import buildClient from '../API/buildClient';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are loggedin</h1> : <h1>Please signin</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
