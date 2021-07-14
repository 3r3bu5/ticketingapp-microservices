import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { currentUserRouter } from './routes/current-user';
import { errorHandler } from './middleware/error-handler';
import { notFoundRouter } from './routes/404';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './config/passport'



const app = express();
app.set('trust proxy', 1) 
app.use(json());

//cookie-session
app.use(cookieSession({
  signed: false,
  secure: true
}))

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

if (!process.env.JWT_KEY){
  throw new Error("JWT key must be defined")
}

export {app}