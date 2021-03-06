import { OrderStatus } from '@a4hticket/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'alohaaaaaa',
    price: 50,
    id: new mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  return ticket;
};

it('fetches the  order', async () => {
  const ticket = await buildTicket();
  const userOne = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(200);
  expect(fetchOrder.id).toEqual(order.id);
});
it('sends 404 if the order isnt found', async () => {
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${new mongoose.Types.ObjectId().toHexString()}`)
    .set('Cookie', global.signup())
    .send()
    .expect(404);
});
it('sends 401 if the order dosent belong to the user', async () => {
  const ticket = await buildTicket();
  const userOne = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signup())
    .send()
    .expect(401);
});
