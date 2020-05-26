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
describe('Shopping List Routes Test', () => {
    let token;
    before(function (done) {
        const user = 'hara_zujo@hotmail.com';
        const password = 'test123';
        chai_1.default.request(app)
            .post('/user/register')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({ "email": user, "password": password }))
            .end((err, res) => {
            res.should.have.status(200);
            chai_1.default.request(app)
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
            chai_1.default.request(app)
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
//# sourceMappingURL=shoppinglist.test.js.map