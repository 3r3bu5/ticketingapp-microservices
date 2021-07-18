import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  const data = { title: 'validdddddddd', price: 20 };
  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send(data)
    .expect(201);
};
it('can fetch list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  const resp2 = await request(app)
    .get(`/api/tickets/`)
    .set('Cookie', global.signup())
    .send()
    .expect(200);
  expect(resp2.body.length).toEqual(3);
});
