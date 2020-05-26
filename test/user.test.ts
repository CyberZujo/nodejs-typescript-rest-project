export {}
import chai from 'chai';
import chaiHttp from 'chai-http';
const app = require('../src/server');
chai.use(chaiHttp);
const should = chai.should();

describe('User Routes Test', () => {
    describe('POST /user/register', () => {

        it('Register user successfully.', (done) => {
            const user =  'hara_zujo@hotmail.com';
            const password = 'test123';

            chai.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ 'email': user, 'password': password }))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('There is already the same user.', (done) => {
            const user =  'hara_zujo@hotmail.com';
            const password = 'test123';

            chai.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ 'email': user, 'password': password }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('No email', (done) => {
            const password = 'test123';
            chai.request(app)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"password": password }))
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it('No password provided', (done) => {
            const email = 'hara_zujo@hotmail.com';
            chai.request(app)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({"email": email }))
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });

    describe('Login tests', () => {
        const user =  'hara_zujo@hotmail.com';
        const password = 'test123';

        it('Success', (done) => {
            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ 'email': user, 'password': password }))
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Wrong password', (done) => {
            const wrongPassword = 'test1'
            const mail = 'hara_zujo@hotmail.com';
            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": mail, "password": wrongPassword }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('No user found', (done) => {
            const unknownUser = 'useruknown@gmail.com';
            const password = 'test123!'

            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": unknownUser, "password": password }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Login fail. Missing "email" field.', (done) => {
            const password = 'test123!';

            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "password": password }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Login fail. Missing "password" field.', (done) => {
            const mail = 'hara_zujo@hotmail.com';

            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": mail }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('Login fail. Invalid email.', (done) => {
            const mail = "hara@";
            const password = "test123!";

            chai.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": mail, "password": password }))
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
});