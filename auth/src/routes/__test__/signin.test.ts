import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'validemail@gmail.com',
      password: 'valid'
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'validemail@gmail.com',
      password: 'valid'
    })
    .expect(200);
});
it('returns a 400 when signin with emaild that doesnt exist', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'notexistemail@gmail.com',
      password: 'valisdd'
    })
    .expect(400);
});
it('fails when signin with a wrong password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'validemail@gmail.com',
      password: 'valid'
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'validemail@gmail.com',
      password: 'sadsadsad'
    })
    .expect(400);
});

it('returns a 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'unvalidemail',
      password: 'valid'
    })
    .expect(400);
});

it('returns a 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'unvalidemail@mail.com',
      password: 'v'
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'valid@gmail.com'
    })
    .expect(400);
  await request(app)
    .post('/api/users/signin')
    .send({
      password: 'passs'
    })
    .expect(400);
});

it('sets a cookie after successful sigin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'validemail@gmail.com',
      password: 'valid'
    })
    .expect(201);

  const resp = await request(app).post('/api/users/signin').send({
    email: 'validemail@gmail.com',
    password: 'valid'
  });
  expect(resp.get('Set-Cookie')).toBeDefined();
});
