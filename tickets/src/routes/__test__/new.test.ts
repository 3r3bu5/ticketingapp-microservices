import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../model/ticket.model';

it('has a route handler listening to /api/tickets for POST requests', async () => {
  const resp = await request(app).post('/api/tickets').send({});
  expect(resp.status).not.toEqual(404);
});

it('can only be accessed if user signedin', async () => {
  const resp = await request(app).post('/api/tickets').send({});
  expect(resp.status).toEqual(401);
});

it('returns status that isnt 401 when user is signedin ', async () => {
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({});
  expect(resp.status).not.toEqual(401);
});

it('returns error if title is not valid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ title: '', price: 15 })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ price: 15 })
    .expect(400);
});

it('returns error if price is not valid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ title: 'validdddddddd', price: '' })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ title: 'validdddddddd', price: -4 })
    .expect(400);
});

it('creates a ticket with a vaild parameters', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({ title: 'validdddddddd', price: 15 })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});
