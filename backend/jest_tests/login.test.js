const request = require('supertest');
const app = require('../server'); // path to your server file
const userdb = require('../schemas/user'); // path to your user model
const mongoose = require('mongoose');

const VERSION = process.env.VERSION;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

afterAll(() => {
    // Close your mongoose connection
    mongoose.connection.close();
  });
  

describe('POST /login', () => {
  it('should return 200 and the user object when the login credentials are correct', async () => {
   
    const user = await userdb.findOne({email: adminEmail});

    const res = await request(app)
    .post(`/${VERSION}/login`)
    .send({ email: user.email, password:adminPassword });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should return 404 when the account does not exist', async () => {
    const res = await request(app)
    .post(`/${VERSION}/login`)
      .send({ email: 'asdf', password:'adminuseasdar ' });

    expect(res.statusCode).toEqual(404);
  });

  it('should return 400 when the password is incorrect', async () => {

    const res = await request(app)
    .post(`/${VERSION}/login`)
      .send({ email: adminEmail, password: 'wrongpassword' });

    expect(res.statusCode).toEqual(400);
  });
});
