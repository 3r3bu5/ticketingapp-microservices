import { OrderStatus } from '@a4hticket/common';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../model/order.model';

it('returns 404 when purchasing order dosnet exist', async () => {
  const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asdsadsadasd',
      orderId: new mongoose.Types.ObjectId().toHexString()
    });
  expect(resp.status).toEqual(404);
});

it('returns 401 if order dosent belong to user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 50,
    status: OrderStatus.Created
  });
  await order.save();
  const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asdsadsadasd',
      orderId: order.id
    });
  expect(resp.status).toEqual(401);
});

it('returns 400 if order is cancelled ', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 50,
    status: OrderStatus.Cancelled
  });
  await order.save();
  const resp = await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: 'asdsadsadasd',
      orderId: order.id
    });
  expect(resp.status).toEqual(400);
});

it('returns error if orderId or token parameters are not valid', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 50,
    status: OrderStatus.Created
  });
  await order.save();
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: '',
      orderId: order.id
    })
    .expect(400);
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: 'asdsadsadasd'
    })
    .expect(400);
});
