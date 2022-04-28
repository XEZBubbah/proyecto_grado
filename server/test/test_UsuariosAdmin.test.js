const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('Usuarios aplicacion web', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "usuariosadmins"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => {   
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /signup', () => {
        it('Sign Up Admin User', (done) => {            // test case 1
            let toSendData = {
                email: "cgonzalez672@unab.edu.co",
                password: "123", 
                confirmPassword: "123", 
                firstName: "Cristhian Alfredo", 
                lastName: "González Alarcón"
            } 
            request(app).post('/userA/signup').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });
    
    describe('POST: /signin', () => {
        it('Sign In Admin User', (done) => {            // test case 2
            let toSendData = {
                email: "cgonzalez672@unab.edu.co",
                password: "123"
            } 
            request(app).post('/userA/signin').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchAllUsers', () => {
        it('Fetch All Mobile Users', (done) => {            // test case 2
            request(app).post('/userA/fetchAllUsers').send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /fetchAdminAvatar/:email', () => {
        it('Fetch Admin Avatar', (done) => {            // test case 2
            request(app).get("/userA/fetchAdminAvatar/cgonzalez672@unab.edu.co").send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.files).contains({});
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchUserCuantity', () => {
        it('Fetch Quantity of All Mobile Users', (done) => {            // test case 2
            request(app).post('/userA/fetchUserCuantity').send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /getUsers', () => {
        it('Fetch All Mobile Users', (done) => {            // test case 2
            request(app).get('/userA/getUsers').send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchUserInfoAdmin', () => {
        it('Fetch Information of an Admin User', (done) => {            // test case 2
            let toSendData = { 
                Correo: "cgonzalez672@unab.edu.co", 
            }
            request(app).post('/userA/fetchUserInfoAdmin').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /:id', () => {
        it('Fetch A Mobile User by its ID', (done) => {            // test case 2
            mongoose.connection.db.collection("usuariosadmins").findOne({
                Correo: "cgonzalez672@unab.edu.co",
                Nombre: "Cristhian Alfredo",
                Apellido: "González Alarcón"
            }).then((res) =>{
                request(app).get(`/userA/${res._id.toString()}`).send({})
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                }).catch((err) => done(err))
            }).catch((err) =>{
                console.log(`Error: ${err}`);
                done();
            })
        });
    });

    describe('POST: /modifyUserInfoAdmin', () => {
        it('Modify Information of an Admin User', (done) => {            // test case 2
            let toSendData = { 
                email: "cgonzalez672@unab.edu.co", 
                nameNew: "Orlando Perez", 
                passwordOld: "123", 
                passwordNew: "1234"
            }
            request(app).post('/userA/modifyUserInfoAdmin').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /deleteUserAccountAdmin', () => {
        it('Delete an Admin User Account', (done) => {            // test case 2
            let toSendData = { 
                Correo: "cgonzalez672@unab.edu.co", 
                password: "1234"
            }
            request(app).post('/userA/deleteUserAccountAdmin').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /deleteUserAccountMovil', () => {
        it('Delete a Mobile User Account', (done) => {            // test case 2
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", 
                Apellido: "Martinez",
                Usuario: "JAX007",
                Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404",
                Correo: "luis66@gmail.com", 
                Contraseña: "123" 
            }).then((res) =>{
                let toSendData = { 
                    Usuario: "JAX007", 
                }
                request(app).post('/userA/deleteUserAccountMovil').send(toSendData)
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                }).catch((err) => done(err))

            }).catch((err) =>{
                console.log(`Error: ${err}`);
                done();
            })
        });
    });
});
