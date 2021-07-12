import express from 'express';
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
import { notFoundRouter } from './routes/404';

const app = express();
app.use(json());

// Routes
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(currentUserRouter)

// 404 Route
app.use(notFoundRouter)
// Error handler 
app.use(errorHandler)


app.listen(4000, () => {
  console.log('Listening on port 4000');
});
