import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
import { notFoundRouter } from './routes/404';
import { connectDB } from './config/db.config';
import passport from 'passport';
import './config/passport'



const app = express();
app.use(json());

// passport init 
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(currentUserRouter)

// 404 Route
app.use(notFoundRouter)
// Error handler 
app.use(errorHandler)

connectDB()

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
