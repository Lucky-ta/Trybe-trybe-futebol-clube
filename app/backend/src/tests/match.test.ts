import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
chai.use(chaiHttp);

const { expect } = chai;

describe('POST /matches', () => {
    let response: Response;
    it('Retorna a mensagem "jwt must be provided" se o token não for provido', async() => {
        response = await chai.request(app)
        .post('/matches')
        .set('authorization', '')
        expect(response.body).to.be.equal('jwt must be provided')
    })
})

describe('GET /matches',() => {
    let response: Response;

    
    it('Retorna status 200 na rota /matches',async() => {
        response = await chai.request(app)
        .get('/matches')
        expect(response.status).to.be.equal(200)
    })
})