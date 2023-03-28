import request from 'supertest';
import server from '@/index';
import { expect } from 'chai';

describe('Message Endpoint Unit tests for Default Root', () => {
  it(`Message Endpoint check message: Welcome to default api route`, async () => {
    const res = await request(server).get('/');
    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property(
      'message',
      'Welcome to default api route'
    );
  });
});
