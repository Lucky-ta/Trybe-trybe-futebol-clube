import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent'
chai.use(chaiHttp);

const { expect } = chai;

const match = {
    homeTeam: 1,
    awayTeam: 2,
    homeTeamGoals: 3,
    awayTeamGoals: 3,
    inProgress: true,
}

describe('POST /matches', () => {
    let response: Response;
    let token: string;
    it('Retorna a mensagem "jwt must be provided" se o token não for provido', async() => {
        response = await chai.request(app)
        .post('/matches')
        .set('authorization', '')
        expect(response.body).to.be.equal('jwt must be provided')
    })

    it('Retorna status 200 com token valido', async () => {
        const data = await chai.request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'secret_admin'})
        token = data.body.token
        response = await chai.request(app)
        .post('/matches')
        .set('authorization', token)
        .send(match)
        expect(response.status).to.be.equal(201)
    })
})

describe('GET /matches',() => {
    let response: Response;

    it('Retorna status 200 na rota /matches',async() => {
        response = await chai.request(app)
        .get('/matches')
        expect(response.status).to.be.equal(200)
    })

    it('rota teams retorna array com partidas em andamento e retorna status 200', async() => {
        response = await chai.request(app)
          .get('/matches?inProgress=true')

            expect(response).to.have.status(200);

      });
    
      it('rota teams retorna array com partidas finalizadas e retorna status 200',async () => {
        response = await chai.request(app)
          .get('/matches?inProgress=false')
            expect(response).to.have.status(200);
    
      });
})

describe('Verifica rota matches insert', () => {
    let response: Response;
  
    it('retorna status 200 fazendo PATCH para a rota /matches/4/finish', async() => {
        response = await chai.request(app)
        .patch('/matches/4/finish')
        expect(response.status).to.be.equal(200)
      })

      it('rota matches com id retorna status 200', async() => {
        response = await chai.request(app)
        .patch('/matches/2')
          expect(response).to.have.status(200);
    });

});
  
