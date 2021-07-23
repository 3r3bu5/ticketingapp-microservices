import { OrderStatus } from '@a4hticket/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order.model';
import { Ticket } from '../../models/ticket.model';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'alohaaaaaa',
    price: 50
  });
  await ticket.save();
  return ticket;
};

it('fetches orders for a particular user', async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();
  const userOne = global.signup();
  const userTwo = global.signup();

  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);
  const responseTwo = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);
  const responseThree = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const getAllOrdersResp = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .send()
    .expect(200);
  expect(getAllOrdersResp.body).toHaveLength(2);
  expect(getAllOrdersResp.body[0].id).toEqual(responseTwo.body.id);
  expect(getAllOrdersResp.body[1].id).toEqual(responseThree.body.id);
});
