let mongoose = require('mongoose');
let Project = require('../Models/Project');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Project', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //   Project.remove({}, (err) => {
    //        done();
    //     });
    // });

    /* Test the /GET route */
    describe('/GET Project', () => {
        it('it should GET all the Project', (done) => {
            chai.request(server).get('/api/projects/').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    /* Test the /POST route */
    describe('/POST Project', () => {
        it('it should not POST a Project without field', (done) => {
            let project = {
                title: 'from test',
                description: 'desc from test',
                category: 0,
                starsNeed: 0,
                price: 100,
                forceTime: '2020-10-05T19:48:54.709Z'
            };
            chai
                .request(server)
                .post('/api/projects/create')
                .set(
                    'x-auth-token',
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDMyNDU3MywiZXhwIjoxNTk0Njg0NTczfQ.f_Ny_NX0HrOyid-ozxmkjT9g0AamQqPJm2Nsl_Utegc'
                )
                .send(project)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('status').eql(100);
                    done();
                });
        });
    });
});
