let mongoose = require('mongoose');
let Project = require('../Models/Project');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Project routine', () => {
    before((done) => {
        //Before each test we empty the database
        Project.deleteMany({}, (err) => {
            done();
        });
    });

    // /* Test /GET All projects */
    // describe('/GET All projects', () => {
    //     it('it should GET all the Project', (done) => {
    //         chai.request(server).get('/api/projects/').end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //             // res.body.length.should.be.eql(0);
    //             done();
    //         });
    //     });
    // });

    // /* Test /POST route */
    // describe('/POST Create project', () => {
    //     it('it should create post successfuly', (done) => {
    //         let project = {
    //             title: 'from test',
    //             description: 'desc from test',
    //             category: 0,
    //             starsNeed: 0,
    //             price: 100,
    //             forceTime: '2020-10-05T19:48:54.709Z'
    //         };
    //         chai
    //             .request(server)
    //             .post('/api/projects/create')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDM5MDI4MX0.ILHGYO4pZZoDiGoBis3lEAwGooYebGPKO6Ww_vvyz7Y'
    //             )
    //             .send(project)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(100);
    //                 done();
    //             });
    //     });
    // });

    // /* Test Pay route */
    // describe('/POST Pay project', () => {
    //     it('it should pay successfuly', (done) => {
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/pay')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDM5MDI4MX0.ILHGYO4pZZoDiGoBis3lEAwGooYebGPKO6Ww_vvyz7Y'
    //             )
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(150);
    //                 done();
    //             });
    //     });
    // });

    // /* Test adding project by karjoo */
    // describe('/POST Add Project', () => {
    //     it('it should add successfuly', (done) => {
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/add')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGU0Yjg1OTdlM2YxOGU0MzgyOGM2In0sImlhdCI6MTU5NDQwMzQzN30.tIRKO1-XfP-Nxns1Tl3JDEmY84qyMCJLqh0HL0ySDas'
    //             )
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(200);
    //                 done();
    //             });
    //     });
    // });

    // /* Test applying project by karjoo */
    // describe('/POST Apply Project', () => {
    //     it('it should apply successfuly', (done) => {
    //         let applyFiles = {
    //             applyFile: 'from test',
    //             applyFilePreview: 'desc from test'
    //         };
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/apply')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGU0Yjg1OTdlM2YxOGU0MzgyOGM2In0sImlhdCI6MTU5NDQwMzQzN30.tIRKO1-XfP-Nxns1Tl3JDEmY84qyMCJLqh0HL0ySDas'
    //             )
    //             .send(applyFiles)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(250);
    //                 done();
    //             });
    //     });
    // });

    // /* Test applying project by karjoo */
    // describe('/POST Apply Project Feedback', () => {
    //     it('it should return status 300', (done) => {
    //         let applyFiles = {
    //             feedback: true,
    //             applyFeedBack: 'desc from test'
    //         };
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/applyFeedback')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDM5MDI4MX0.ILHGYO4pZZoDiGoBis3lEAwGooYebGPKO6Ww_vvyz7Y'
    //             )
    //             .send(applyFiles)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(300);
    //                 done();
    //             });
    //     });
    // });

    // /* Test aproving project by karfarna */
    // describe('/POST Aprove Project', () => {
    //     it('it should aprove successfuly', (done) => {
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/aprove')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDM5MDI4MX0.ILHGYO4pZZoDiGoBis3lEAwGooYebGPKO6Ww_vvyz7Y'
    //             )
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(350);
    //                 done();
    //             });
    //     });
    // });

    // /* Test aproving project by karfarna */
    // describe('/POST Is Project karfarma satisfied', () => {
    //     it('it should return http status 200', (done) => {
    //         let data = {
    //             isSatisfied: true
    //         }
    //         chai
    //             .request(server)
    //             .post('/api/projects/0/isSatisfied')
    //             .set(
    //                 'x-auth-token',
    //                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYwMGQ4YTkxOGMzNzIxNzY4YzE4ZjFhIn0sImlhdCI6MTU5NDM5MDI4MX0.ILHGYO4pZZoDiGoBis3lEAwGooYebGPKO6Ww_vvyz7Y'
    //             )
    //             .send(data)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').eql(400);
    //                 done();
    //             });
    //     });
    // });
});
