import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'validemail@gmail.com',
      password: 'valid'
    })
    .expect(201);
});

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'unvalidemail',
      password: 'valid'
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'unvalidemail@mail.com',
      password: 'v'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'valid@gmail.com'
    })
    .expect(400);
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'passs'
    })
    .expect(400);
});

it('disallow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'valid@gmail.com',
      password: 'validpassword'
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'valid@gmail.com',
      password: 'validpassword'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const resp = await request(app).post('/api/users/signup').send({
    email: 'valid@gmail.com',
    password: 'validpassword'
  });
  expect(resp.get('Set-Cookie')).toBeDefined();
});
