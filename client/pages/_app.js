import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../API/buildClient';
import Header from '../components/Header';

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <div className="container">
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appcontext) => {
  const client = buildClient(appcontext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps;
  if (appcontext.Component.getInitialProps) {
    pageProps = await appcontext.Component.getInitialProps(appcontext.ctx);
  }
  return {
    currentUser: data.currentUser,
    pageProps
  };
};

export default MyApp;
