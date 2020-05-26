"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app = require('../src/server');
chai_1.default.use(chai_http_1.default);
const should = chai_1.default.should();
describe('User Routes Test', () => {
    describe('POST /user/register', () => {
        it('Register user successfully.', (done) => {
            const user = 'hara_zujo@hotmail.com';
            const password = 'test123';
            chai_1.default.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ 'email': user, 'password': password }))
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('There is already the same user.', (done) => {
            const user = 'hara_zujo@hotmail.com';
            const password = 'test123';
            chai_1.default.request(app)
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
            chai_1.default.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "password": password }))
                .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
        it('No password provided', (done) => {
            const email = 'hara_zujo@hotmail.com';
            chai_1.default.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": email }))
                .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });
    });
    describe('Login tests', () => {
        const user = 'hara_zujo@hotmail.com';
        const password = 'test123';
        it('Success', (done) => {
            chai_1.default.request(app)
                .post('/user/login')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ 'email': user, 'password': password }))
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('Wrong password', (done) => {
            const wrongPassword = 'test1';
            const mail = 'hara_zujo@hotmail.com';
            chai_1.default.request(app)
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
            const password = 'test123!';
            chai_1.default.request(app)
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
            chai_1.default.request(app)
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
            chai_1.default.request(app)
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
            chai_1.default.request(app)
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
//# sourceMappingURL=user.test.js.map