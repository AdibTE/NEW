let mongoose = require('mongoose');
let Project = require('../Models/Project');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User Auth', () => {
    // before((done) => {
    //     //Before each test we empty the database
    //     Project.deleteMany({}, (err) => {
    //         done();
    //     });
    // });

    /* Test login auth */
    describe('/POST Auth', () => {
        it('it should return token', (done) => {
            let user = {
                email: 'rohany.adib77@gmail.com',
                password: '123456'
            };
            chai.request(server).post('/api/auth').send(user).end((err, res) => {
                // console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
        });
    });
});
