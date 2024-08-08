const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipesData');
const recipeRouter = require('../routes/recipieRoutes');

const app = express();
app.use(express.json());
app.use('/recipes', recipeRouter);

describe('Recipe Controller', () => {
    beforeAll(async () => {
        const dbUri = 'mongodb+srv://david:ecommercescratchproject@cluster0.k7fwyhh.mongodb.net/RecipEase';
        await mongoose.connect(dbUri)
        });
      });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
  
    it('should insert recipes into the database', async () => {
      const response = await request(app).post('/recipes/insert');
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Recipes inserted successfully');
    }, 60000);
  
    it('should return a recipe by name', async () => {
      await Recipe.create({ name: 'Teriyaki Chicken Casserole', category: 'Main' });
      const response = await request(app).post('/recipes/search').send({ name: 'Teriyaki Chicken Casserole' });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Teriyaki Chicken Casserole');
    });
  
    it('should return 404 if recipe is not found by name', async () => {
      const response = await request(app).post('/recipes/search').send({ name: 'Non-Existent Recipe' });
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Recipe not found');
    });
  
    it('should return a recipe by id', async () => {
      const recipe = await Recipe.create({ name: 'Teriyaki Chicken Casserole', category: 'Main' });
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Teriyaki Chicken Casserole');
    });
  
    it('should return 404 if recipe is not found by id', async () => {
      const response = await request(app).get('/recipes/64d3d2c9b1e800b58129b8f1');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Recipe not found');
    });
  
    it('should return autocomplete suggestions by query id', async () => {
      await Recipe.create({ name: 'Teriyaki Chicken Casserole', category: 'Main' });
      const response = await request(app).get('/recipes/autocompleteId?query=Ter');
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should return autocomplete suggestions by name', async () => {
      await Recipe.create({ name: 'Teriyaki Chicken Casserole', category: 'Main' });
      const response = await request(app).post('/recipes/autocompleteName').send({ name: 'Ter' });
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
 