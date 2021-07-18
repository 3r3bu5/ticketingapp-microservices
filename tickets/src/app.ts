import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, currentUser } from '@a4hticket/common';
import { notFoundRouter } from './routes/404';
import cookieSession from 'cookie-session';
import { createNewTicket } from './routes/new';
import { showTicketRouter } from './routes/show';
import { showTicketsRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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
app.use(createNewTicket);
app.use(showTicketRouter);
app.use(showTicketsRouter);
app.use(updateTicketRouter);

// 404 Route
app.use(notFoundRouter);
// Error handler
app.use(errorHandler as any);

export { app };
