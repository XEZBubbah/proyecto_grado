const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
var user_id = ""

describe('Mobile Chat Group', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "chatgrupos"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => { 
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /storeUserMessages', () => {
        it('Store Messages Sent by a Mobile User Within a Group', (done) => {            // test case 1
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", Apellido: "Martinez", Usuario: "JAX007", Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404", Correo: "luis66@gmail.com", Contraseña: "123" 
            }).then((res) => {
                user_id = res.insertedId;
                mongoose.connection.db.collection("grupos").insertOne({
                    Nombre_Grupo: "Grupo prueba 1", Descripcion: "Grupo de pruebas", Visibilidad: true,
                    Permiso: 'A', Contraseña_Grupo: "", UAppMov_Id: user_id, UAppMov_Usuario: "JAX007"
                }).then((res) => {
                    let sendData = {
                        text: "Print(Hola Mundo)",
                        Usuario: "JAX007",
                        Grupo: "Grupo prueba 1",
                        createdAt: "2022-04-20T02:04:47.100Z"
                    }
                    request(app).post('/chatM/storeUserMessages').send(sendData)
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    }).catch((err) => done(err))
                }).catch((err) => done(err))
            }).catch((err) =>{
                console.log(`Error: ${err}`);
                done();
            });
        });
    });

    describe('POST: /fetchChatMessages', () => {
        it('Fetch Group Chat Messages', (done) => {            // test case 2
            let sendData = { Grupo: "Grupo prueba 1" };
            request(app).post("/chatM/fetchChatMessages").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() =>{
                mongoose.connection.db.collection("chatgrupos").deleteOne({ 
                    Grupos_Nombre_Grupo: "Grupo prueba 1",
                    UAppMov_Usuario: "JAX007"
                }).catch((err) =>{
                    console.log(`Error: ${err}`);
                });
                mongoose.connection.db.collection("grupos").deleteOne({Nombre_Grupo: "Grupo prueba 1"})
                .catch((err) =>{
                    console.log(`Error: ${err}`);
                });
                mongoose.connection.db.collection("usuariosappmovils").deleteOne({Usuario: "JAX007"})
                .catch((err) =>{
                    console.log(`Error: ${err}`);
                });
            });
        });
    });
});
