import request from "supertest";
import { app } from "../../app";

it('clears cookie after signout', async () => {
    await request(app)
    .post("/api/users/signup")
    .send( {
        email: "validemail@gmail.com",
        password: "valid"
    })
    .expect(201)
    const resp = await request(app)
    .post("/api/users/signout")
    .send()
    .expect(200)
    expect(resp.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
