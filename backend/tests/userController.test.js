const app = require('../server');


const request = require('supertest');

describe('User Authentication', () => {
  describe('POST /login', () => {
    test('should authenticate user and return JWT', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app).post('/login').send(userData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token'); // Check if token is present in the response
    });

    test('should deny access with wrong credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app).post('/login').send(userData);
      expect(response.statusCode).toBe(401);
    });
  });
});
