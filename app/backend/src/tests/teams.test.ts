import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams',() => {
    let response: Response;

    
    it('Retorna status 200 na rota /teams',async() => {
        response = await chai.request(app)
        .get('/teams')
        expect(response.status).to.be.equal(200)
    })

    it('Retorna status 200 na rota /teams/:id',async() => {
        response = await chai.request(app)
        .get('/teams/2')
        expect(response.status).to.be.equal(200)
    })

    it('Retorna status 200 na rota /teams/:id',async() => {
        const expectBody = { id: 2, teamName: 'Bahia' }
        response = await chai.request(app)
        .get('/teams/2')        
        expect(response.body).to.be.include(expectBody)
    })

    it('Retorna status 200 na rota /teams/:id',async() => {
        response = await chai.request(app)
        .get('/teams/2')
        expect(response.status).to.be.equal(200)
    })
    it('rota teams retorna erro e retorna status 404', async() => {
        response = await chai.request(app)
          .get('/teams/5400')
        expect(response.status).to.be.equal(500);
 
      });
})