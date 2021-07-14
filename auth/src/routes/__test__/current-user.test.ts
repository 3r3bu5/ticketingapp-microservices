import request from 'supertest';
import { app } from '../../app';

it('returns information about loggedin user', async () => {
  const cookie = await global.signup();
  const resp = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200);
  expect(resp.body.currentUser.email).toEqual('validemail@gmail.com');
});
it('returns null if not authenticated', async () => {
  const resp = await request(app)
    .get('/api/users/currentuser')
    .expect(200)
    .send();
  expect(resp.body.currentUser).toEqual(null);
});
