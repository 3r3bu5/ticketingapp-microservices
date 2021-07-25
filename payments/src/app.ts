import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, currentUser } from '@a4hticket/common';
import { notFoundRouter } from './routes/404';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', 1);
app.use(json());

//cookie-session
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' ? true : false
  })
);

app.use(currentUser as any);

// Routes

// 404 Route
app.use(notFoundRouter);
// Error handler
app.use(errorHandler as any);

export { app };
