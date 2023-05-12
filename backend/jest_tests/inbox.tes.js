const request = require('supertest');
const app = require('../server'); // path to your server file
const userdb = require('../schemas/user'); // path to your user model
const mongoose = require('mongoose');

const VERSION = process.env.VERSION;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminId = process.env.ADMIN_ID;

afterAll(() => {
    // Close your mongoose connection
    mongoose.connection.close();
  });
  

describe(`GET /${adminId}/inbox/${'all emails'}`, () => {
    it('should return 200 and the inbox data when provided a valid userId, inboxName, and authorization header', async () => {
      // Replace these values with the ones from your test database

      const loginRes = await request(app)
      .post(`/${VERSION}/login`)
      .send({ email: adminEmail, password:adminPassword });
      const accessToken = loginRes.body.accessToken;

      const res = await request(app)
        .get(`/${VERSION}/user/${adminId}/inbox/all emails`)
        .set('Authorization', `Bearer ${accessToken}`)
        .query({ page: 1, limit: 10, timeframe: 'all', search: '' });
  
      expect(res.statusCode).toEqual(200);
      expect(res.body.inbox.inboxName).toBe('all emails');
      expect(res.body.pagination).toHaveProperty('page');
      expect(res.body.pagination).toHaveProperty('limit');
      expect(res.body.pagination).toHaveProperty('totalCount');
      expect(res.body.pagination).toHaveProperty('totalPages');
    }, 30000);
  
    it('should return 400 when the authorization header is missing', async () => {
      const res = await request(app)
      .get(`/${VERSION}/user/${adminId}/inbox/${'all emails'}`)
      .query({ page: 1, limit: 10, timeframe: 'all', search: '' });
  
      expect(res.statusCode).toEqual(400);
    });
  
    it('should return 404 when the userId or inboxName does not exist', async () => {
        const loginRes = await request(app)
        .post(`/${VERSION}/login`)
        .send({ email: adminEmail, password:adminPassword });
        const accessToken = loginRes.body.accessToken;
  
        const res = await request(app)
          .get(`/${VERSION}/user/${adminId}/inbox/${'alla emails'}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .query({ page: 1, limit: 10, timeframe: 'all', search: '' });
  
      expect(res.statusCode).toEqual(404);
    }, 30000);
  });