import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { getDatabase } from '../src/database/connection.js';

// test the health endpoint
describe('GET /api/health', () => {
  it('returns status ok and database connected', async () => {
    const db = getDatabase(':memory:');
    const app = createApp(db);

    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      database: 'connected'
    });
  });
});