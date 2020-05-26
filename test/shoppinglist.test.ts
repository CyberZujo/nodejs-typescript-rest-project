export {}
import chai from 'chai';
import chaiHttp from 'chai-http';
const app = require('../src/server');
chai.use(chaiHttp);
const should = chai.should();

describe('Shopping List Routes Test', () => {
    let token;


    before(function (done) {
        const user = 'hara_zujo@hotmail.com';
        const password = 'test123';

        chai.request(app)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": user, "password": password }))
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(app)
                    .post('/user/login')
                    .set('Content-Type', 'application/json')
                    .send(JSON.stringify({ "email": user, "password": password }))
                    .end((err, res) => {
                        res.should.have.status(200);
                        token = res.body.token;
                        done();
                    });
            });
    });

    describe('POST /shoppingList', () => {
        it('Successfully created list', (done) => {
            chai.request(app)
                .post('/shoppingList')
                .set('Content-Type', 'application/json')
                .set('token', token)
                .send(JSON.stringify({ "name": 'testlist1' }))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    
    });
});