const mongooseConnect = require('./../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('POST: /signup', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "usuariosappmovils"})
            .next((error,collection) => {                 //deleting the collection before each
                if(collection){                         //test case to avoid duplicated key error
                    mongoose.connection.db.dropCollection("usuariosappmovils")
                    .then(() => done())                                       
                    .catch((err) => done(err))
                }
                else{
                    done(error)
                }
            });
    });

    after((done) => {                       // runs after the last test case
        mongoose.connection.db.dropCollection("usuariosappmovils")
        .then(() => {
            mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
        })                                       
        .catch((err) => done(err))
    })
  
    it('Sign Up Mobile User', (done) => {            // test case 1
        let toSendData = {
            firstName: "Luis", 
            lastName: "Martinez",
            userName: "JAX007",
            birthDate: "07-12-2000",
            phone: "3103918404",
            email: "luis66@gmail.com", 
            password: "123" 
        } 
        request(app).post('/userM/signupMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(Object.keys(res.body.result)).length(9);
                done();
            }).catch((err) => done(err))
    });

    it('Sign Up Mobile User', (done) => {            // test case 1
        let toSendData = {
            firstName: "Luis", 
            lastName: "Martinez",
            userName: "JAX007",
            birthDate: "07-12-2000",
            phone: "3103918404",
            email: "luis66@gmail.com", 
            password: "123" 
        } 
        request(app).post('/userM/signupMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(Object.keys(res.body.result)).length(9);
                done();
            }).catch((err) => done(err))
    });

    it('Sign Up Mobile User', (done) => {            // test case 1
        let toSendData = {
            firstName: "Luis", 
            lastName: "Martinez",
            userName: "JAX007",
            birthDate: "07-12-2000",
            phone: "3103918404",
            email: "luis66@gmail.com", 
            password: "123" 
        } 
        request(app).post('/userM/signupMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(Object.keys(res.body.result)).length(9);
                done();
            }).catch((err) => done(err))
    });

    it('Sign Up Mobile User', (done) => {            // test case 1
        let toSendData = {
            firstName: "Luis", 
            lastName: "Martinez",
            userName: "JAX007",
            birthDate: "07-12-2000",
            phone: "3103918404",
            email: "luis66@gmail.com", 
            password: "123" 
        } 
        request(app).post('/userM/signupMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(Object.keys(res.body.result)).length(9);
                done();
            }).catch((err) => done(err))
    });

    it('Sign Up Mobile User', (done) => {            // test case 1
        let toSendData = {
            firstName: "Luis", 
            lastName: "Martinez",
            userName: "JAX007",
            birthDate: "07-12-2000",
            phone: "3103918404",
            email: "luis66@gmail.com", 
            password: "123" 
        } 
        request(app).post('/userM/signupMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(Object.keys(res.body.result)).length(9);
                done();
            }).catch((err) => done(err))
    });
});