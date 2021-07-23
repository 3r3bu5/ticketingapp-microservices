import { OrderStatus } from '@a4hticket/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';
import { natsWrapper } from '../../nats-wrapper';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'alohaaaaaa',
    price: 50
  });
  await ticket.save();
  return ticket;
};

it('sends 404 if the order isnt found', async () => {
  const { body: fetchOrder } = await request(app)
    .delete(`/api/orders/${new mongoose.Types.ObjectId().toHexString()}`)
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

it('sets order status to be cancelled', async () => {
  const ticket = await buildTicket();
  const userOne = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an event when cancelled', async () => {
  const ticket = await buildTicket();
  const userOne = global.signup();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(204);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
