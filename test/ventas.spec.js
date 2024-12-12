const request = require('supertest')
const app = '../index.js';

describe('Pruebas GET', () => {
    test('Retornar código 200 en ruta /', async () => {
        const response = await request(app).get('/')
        expect(response.statusCode).toBe(200)
    });

    test('Retornar ventas en ruta /ventas', async () => {
        const response = await request(app).get('/ventas')
        expect(response.body).toEqual(expect.any(Array))
    });
});


