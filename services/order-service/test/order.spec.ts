import request from 'supertest';
import app from '../src/index';

describe('POST /orders', () => {
  it('should return 401 when no bearer token is provided', async () => {
    const res = await request(app).post('/orders').send({
      productId: 'P001',
      quantity: 1,
    });
    expect(res.status).toBe(401);
  });

  it('should return 400 when payload is invalid', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', 'Bearer test123')
      .send({
        productId: 'P001',
        quantity: 0,
      });
    expect(res.status).toBe(400);
  });

  it('should return 201 when valid payload and token are provided', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', 'Bearer test123')
      .send({
        productId: 'P001',
        quantity: 1,
      });
    expect(res.status).toBe(201);
  });
});
