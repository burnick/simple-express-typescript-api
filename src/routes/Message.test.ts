import request from 'supertest';
import server from '@/index';
import { expect } from 'chai';

import {
  WelcomeMessage,
  GoodByeMessage,
  DontUnderstandMessage,
} from '@/utils/constants';

describe('Unit tests for Message EndPoint', () => {
  it(`Message Endpoint check Welcome message using Hello`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123',
        message: 'Hello, I’m John',
      })
      .set('Accept', 'application/json; charset=utf-8');
    console.log(res.body);
    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123');
    expect(res.body).to.have.property('response', WelcomeMessage);
  });

  it(`Message Endpoint check Welcome message using Hi`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123',
        message: 'Hi, I’m John',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123');
    expect(res.body).to.have.property('response', WelcomeMessage);
  });

  it(`Message Endpoint check Hello message using Hello`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd12223',
        message: 'Hello',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd12223');
    expect(res.body).to.have.property('response', WelcomeMessage);
  });
  it(`Message Endpoint check Goodbye message using Goodbye`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123',
        message: 'Goodbye',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123');
    expect(res.body).to.have.property('response', GoodByeMessage);
  });

  it(`Message Endpoint check Goodbye message using bye`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd12223',
        message: 'bye',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd12223');
    expect(res.body).to.have.property('response', GoodByeMessage);
  });

  it(`Message Endpoint check  missing conversation Id`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        message: 'Hello',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 400);
  });

  it(`Message Endpoint check  missing message`, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 400);
  });

  it(`Message Endpoint check  First context detected takes priority for Hello `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message: 'yehey hELLO BYE',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', WelcomeMessage);
  });

  it(`Message Endpoint check  First context detected takes priority for Hi `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message:
          'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown  hi BYE',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', WelcomeMessage);
  });

  it(`Message Endpoint check  First context detected takes priority for Goodbye `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message: 'yehey Goodbye Hello',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', GoodByeMessage);
  });

  it(`Message Endpoint check  First context detected takes priority for bye `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message: 'yehey bYe Hello',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', GoodByeMessage);
  });

  it(`Message Endpoint check  First context detected takes priority for Hi inside `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message: 'yeheyHiUnknown',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', DontUnderstandMessage);
  });

  it(`Message Endpoint check  First context detected takes priority for Bye hidden inside `, async () => {
    const res = await request(server)
      .post('/message')
      .send({
        conversationId: 'abcd123223',
        message: 'yeheybyeUnknown yeheyGoodbyeUnknown',
      })
      .set('Accept', 'application/json; charset=utf-8');

    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('response_id', 'abcd123223');
    expect(res.body).to.have.property('response', DontUnderstandMessage);
  });
});
