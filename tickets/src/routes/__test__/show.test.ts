import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'
it('returns 404 if not found ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    const resp = await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    expect(resp.status).toEqual(404);
 });

it('returns the ticket if it is found', async () => { 
    const data = {title: 'validdddddddd', price: 15}
    const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send(data)
    .expect(201)
    const resp2 = await request(app)
    .get(`/api/tickets/${resp.body.id}`)
    .set('Cookie', global.signup())
    .send(data)
    .expect(200)
    expect(resp2.body.title).toEqual(data.title)
});
