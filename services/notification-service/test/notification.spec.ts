import request from 'supertest';
import app from '../src/index';

describe('GET /notifications', () => {
  it('should return 401 when no bearer token is provided', async () => {
    const res = await request(app).get('/notifications');
    expect(res.status).toBe(401);
  });

  it('should return 200 when token is provided', async () => {
    const res = await request(app)
      .get('/notifications?limit=2')
      .set('Authorization', 'Bearer test123');
    expect(res.status).toBe(200);
  });
});
