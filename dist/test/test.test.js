"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const app = require('../src/server');
const sinon = require('sinon');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
describe('User Routes Test', () => {
    let registered_user;
    let registered_password;
    let registered_user_token;
    describe('POST /user/register', () => {
        it('Register user success.', (done) => {
            const user_valid = "hara_zujo@gmail.com";
            const password_valid = "test123";
            registered_user = user_valid;
            registered_password = password_valid;
            chai_1.default.request(app)
                .post('/user/register')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify({ "email": user_valid, "password": password_valid }))
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.eql({ message: 'Success' });
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
                res.body.should.eql([
                    {
                        "message": "Path `email` is required."
                    }
                ]);
                done();
            });
        });
    });
});
//# sourceMappingURL=test.test.js.map