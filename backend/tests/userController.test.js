const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User Controller', () => {
  beforeAll(async () => {
    const dbUri = 'mongodb+srv://david:ecommercescratchproject@cluster0.k7fwyhh.mongodb.net/RecipEase';
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/users/register').send({
      firstName: 'John',
      lastName: 'cena',
      email: 'john.cena.unique@example.com',
      password: 'Password123!',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe('john.cena.unique@example.com');
  });

  it('should login a user with valid credentials', async () => {
    await request(app).post('/users/register').send({
      firstName: 'Login',
      lastName: 'Test',
      email: 'login.unique@example.com',
      password: 'Password123!',
    });
    const response = await request(app).post('/users/login').send({
      email: 'login.unique@example.com',
      password: 'Password123!',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('login.test@example.com');
  });

  it('should get user details with a valid token', async () => {
    const registerResponse = await request(app).post('/users/register').send({
      firstName: 'Details',
      lastName: 'Test',
      email: 'details.test@example.com',
      password: 'Password123!',
    });

    const loginResponse = await request(app).post('/users/login').send({
      email: 'details.test@example.com',
      password: 'Password123!',
    });

    const token = loginResponse.headers['set-cookie']?.[0]?.split(';')[0]?.split('=')[1];

    const response = await request(app)
      .get('/users/userInfo')
      .set('Cookie', [`token=${token}`]);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe('details.test@example.com');
  });

  it('should update user favorite recipes', async () => {
    const registerResponse = await request(app).post('/users/register').send({
      firstName: 'Favorite',
      lastName: 'Test',
      email: 'favorite.test@example.com',
      password: 'Password123!',
    });

    const loginResponse = await request(app).post('/users/login').send({
      email: 'favorite.test@example.com',
      password: 'Password123!',
    });

    const token = loginResponse.headers['set-cookie']?.[0]?.split(';')[0]?.split('=')[1];

    const response = await request(app)
      .patch('/users/favorite')
      .set('Cookie', [`token=${token}`])
      .send({ recipeId: '64d3d2c9b1e800b58129b8f1' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Favorites updated successfully');
  });
});
