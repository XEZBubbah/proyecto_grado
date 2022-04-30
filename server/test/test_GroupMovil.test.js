const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
var user_id = ""

describe('Group Mobile User', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "grupos"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => { 
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /createGroupMov', () => {
        it('Create Mobile User Group', (done) => {            // test case 1
            mongoose.connection.db.collection("grupos").deleteOne({Nombre_Grupo: "Grupo prueba 1"})
            .catch((err) =>{
                    console.log(`Error: ${err}`);
            });
            mongoose.connection.db.collection("usuariosappmovils").deleteOne({Usuario: "JAX007"})
            .catch((err) =>{
                    console.log(`Error: ${err}`);
            });

            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", Apellido: "Martinez", Usuario: "JAX007", Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404", Correo: "luis66@gmail.com", Contraseña: "123" 
            }).then((res) => {
                let sendData = {
                    Nombre_Grupo: "Grupo prueba 1", 
                    Descripcion: "Grupo de pruebas", 
                    Visibilidad: true, 
                    Contraseña_Grupo: "", 
                    Usuario: "JAX007"
                }
                request(app).post('/groupM/createGroupMov').send(sendData)
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    }).catch((err) => done(err))
            }).catch((err) => {
                console.log(`Error: ${err}`);
                done();
            });
        });
    });

    describe('POST: /fetchGroupMov', () => {
        it('Fetch User Groups', (done) => {            // test case 2
            let sendData = { Usuario: "JAX007" };
            request(app).post("/groupM/fetchGroupMov").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /fetchUserGroupMov', () => {
        it('Fetch A User Group', (done) => {            // test case 2
            let sendData = { Usuario: "JAX007" };
            request(app).post("/groupM/fetchUserGroupMov").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /getGroupMov', () => {
        it('Fetch A User Group In Detail', (done) => {            // test case 2
            let sendData = { 
                Nombre_Grupo: "Grupo prueba 1",
                Contraseña_Grupo: "",
                Usuario: "JAX007" 
            };
            request(app).post("/groupM/getGroupMov").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /vinculateToGroup', () => {
        it('Vinculate A User To An Existing Group', (done) => {            // test case 2
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Pedro", Apellido: "Rodriguez", Usuario: "JAX008", Fecha_Nacimiento:"12-04-2005",
                Celular: "313378950", Correo: "Pedro00@gmail.com", Contraseña: "1234" 
            }).then((res) => {
                let sendData = { 
                    Nombre_Grupo: "Grupo prueba 1",
                    Contraseña_Grupo: "",
                    Usuario: "JAX008" 
                };
                request(app).post("/groupM/vinculateToGroup").send(sendData)
                .then((res) => {
                    expect(res.statusCode).to.equal(200);
                    done();
                }).catch((err) => done(err))
            }).catch((err) => {
                console.log(`Error: ${err}`);
                done();
            });
        });
    });

    describe('POST: /deleteUserGroup', () => {
        it('Delete A User Group And All Its References', (done) => {            // test case 2
            let sendData = { 
                Nombre_Grupo: "Grupo prueba 1",
                Contraseña_Grupo: "",
                Usuario: "JAX007" 
            };
            request(app).post("/groupM/deleteUserGroup").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() =>{
                mongoose.connection.db.collection("usuariosappmovils").deleteMany({
                    Usuario: { $in: ["JAX007","JAX008"]}
                }).catch((err) =>{
                    console.log(`Error: ${err}`);
                });
            })
        });
    });
});
