import { OrderStatus } from '@a4hticket/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';
import { natsWrapper } from '../../nats-wrapper';

jest.setTimeout(30000);

it('has a route handler listening to /api/orders for POST requests', async () => {
  const resp = await request(app).post('/api/orders').send({});
  expect(resp.status).not.toEqual(404);
});

it('can only be accessed if user signedin', async () => {
  const resp = await request(app).post('/api/orders').send({});
  expect(resp.status).toEqual(401);
});

it('returns status that isnt 401 when user is signedin ', async () => {
  const resp = await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({});
  expect(resp.status).not.toEqual(401);
});

it('returns error if ticketId is not valid', async () => {
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({ ticketId: '' })
    .expect(400);
});

it('returns an error if the ticket dosent exist', async () => {
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({ ticketId: mongoose.Types.ObjectId().toHexString() })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    expiresAt: new Date()
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({ ticketId: ticket.id })
    .expect(400);
});
it('successfully reserve a ticket', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it('emits an event when created', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
