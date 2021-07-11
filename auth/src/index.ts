import express from 'express';
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';

const app = express();
app.use(json());

// Routes
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(currentUserRouter)

app.use((req, res, next) => {
  const err = new Error('404 NOT FOUND');
  next(err);
});

app.use(errorHandler)


app.listen(4000, () => {
  console.log('Listening on port 4000');
});
