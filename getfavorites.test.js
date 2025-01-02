const request = require('supertest');
const app = require('./app');
const Favorite = require('./models/favoriteSchema');


describe('GET /showFavorites/:token', () => {
    it('should get all favorites of a user', async () => {
        const response = await request(app).get('/showFavorites/zueypVESSwNonr67uXmF4tOiMC_BzomC');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

});


