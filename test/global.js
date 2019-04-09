const chai = require('chai');
const chaiHttp = require('chai-http');
const UserController = require('../controllers/user.controller');
const UserModel = require('../models/user.model');
const server = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;

const userCredentialsSuccess = {
    email: 'sponge@bob.com',
    password: 'garyTheSnail'
}

const userCredentialsFail = {
    email: 'sponge@bob.com',
    password: 'garyTheSnail'
}
const BASE_API_URL = 'routev1';



describe('SUCCESS: Route Testing', () => {
    describe('GET "/" : Init route of the application', () => {
        it('It should return a status of 200', (done) => {
            chai.request(server)
                .get(`/${BASE_API_URL}/`)
                .end(function (err, res) {
                    console.log('res', res.body);
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
    describe('POST "/users/create" : Create User based on Institution', () => {
        it('It should return a user object', (done) => {
            chai.request(server)
                .post(`/${BASE_API_URL}/users/create`)
                .send(userCredentialsSuccess)
                .then(function (err, res) {
                    console.log('res', res.body);
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
    describe('GET "/books" : Init route of the application', () => {
        it('It should return a status of 200', (done) => {
            chai.request(server)
                .get(`/${BASE_API_URL}/`)
                .end(function (err, res) {
                    console.log('res', res.body);
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
    describe('GET "/" : Init route of the application', () => {
        it('It should return a status of 200', (done) => {
            chai.request(server)
                .get(`/${BASE_API_URL}/`)
                .end(function (err, res) {
                    console.log('res', res.body);
                    expect(res).to.have.status(200);
                    done();                               // <= Call done to signal callback end
                });
        });
    });
});
        // beforeEach((done) => {
        //     // Reset user mode before each test
        //     UserModel.remove({}, (err, data) => {
        //         console.log(data);
        //         console.log(err);
        //         done();
        //     })
        // });