import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login',() => {
  let result: Response;
    it('Retorna status 400 se a senha não for provida', async() => {
      result = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })
      expect(result).to.have.status(400)
    });

    it('Retorna status 400 se a email não for provido', async() => {
      result = await chai.request(app)
      .post('/login')
      .send({ password: 'secret_admin' })
      expect(result).to.have.status(400)
    });

    it('Retorna a mensagem "All fields must be filled" se a senha não for provida', async() => {
      result = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' })
      expect(result.body.message).to.be.equal('All fields must be filled')
    });  
  
})

