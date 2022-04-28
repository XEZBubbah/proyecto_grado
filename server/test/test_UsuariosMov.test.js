const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('Usuarios aplicacion movil', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "usuariosappmovils"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => {                       
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /signup', () => {
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
                done();
            }).catch((err) => done(err))
        });
    });
    
    describe('POST: /signin', () => {
        it('Sign In Mobile User', (done) => {            // test case 2
            let toSendData = {
                userName: "JAX007",
                password: "123"
            } 
            request(app).post('/userM/signinMov').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchAllUsers', () => {
        it('Fetch All Mobile Users', (done) => {            // test case 2
            request(app).post('/userM/fetchAllUsers').send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchUserInfo', () => {
        it('Fetch a Mobile User', (done) => {            // test case 2
            let toSendData = {
                Usuario: "JAX007"
            } 
            request(app).post('/userM/fetchUserInfo').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /modifyUserInfo', () => {
        it('Modify Information Of a Mobile User', (done) => {            // test case 2
            let toSendData = {
                email: "", 
                userNameOld: "JAX007", 
                userNameNew: "JAX009", 
                phone: "3876453900"
            } 
            request(app).post('/userM/modifyUserInfo').send(toSendData)
            .then((res) => {
                console.log(res.body);
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /restorePassword', () => {
        it('Restore Password of a Mobile User', (done) => {            // test case 2
            let toSendData = { 
                Usuario: "JAX009", 
                Correo: "luis66@gmail.com", 
                Nueva_Contra1: "123", 
                Nueva_Contra2: "123"
            }
            request(app).post('/userM/restorePassword').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /changePassword', () => {
        it('Change Password of a Mobile User', (done) => {            // test case 2
            let toSendData = {
                Usuario: "JAX009", 
                Contra_Actual: "123", 
                Nueva_Contra1: "1234", 
                Nueva_Contra2: "1234"
            }
            request(app).post('/userM/changePassword').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /deleteUserAccount', () => {
        it('Delete a Mobile User Account', (done) => {            // test case 2
            let toSendData = {
                Usuario: "JAX009"
            }
            request(app).post('/userM/deleteUserAccount').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });
});
