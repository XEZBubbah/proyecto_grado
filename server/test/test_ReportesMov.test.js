const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('Reportes aplicacion movil', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "reportes"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => { 
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /createReport', () => {
        it('Report Created by a Mobile User', (done) => {            // test case 1
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", 
                Apellido: "Martinez",
                Usuario: "JAX007",
                Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404",
                Correo: "luis66@gmail.com", 
                Contraseña: "123" 
            }).then((res) =>{
                console.log("Creo usuario")
                console.log(res.insertedId);
                let toSendData = { 
                    Asunto: "Reporte de prueba :D",
                    Descripcion: "Testing en Mocha",
                    Tipo_Reporte: "Usuario",
                    Usuario: "JAX007"
                }
                console.log(toSendData)
                request(app).post('/reportM/createReport').send(toSendData)
                .then((res) => {
                    console.log(res.error);
                    expect(res.statusCode).to.equal(200);
                    done();
                }).catch((err) => done(err))
            }).catch((err) =>{
                console.log(`Error: ${err}`);
                done();
            }).finally(() =>{
                mongoose.connection.db.collection("reportes").deleteOne({Usuario: "JAX007"});
            })
        });
    });
    
    describe('POST: /fetchReportMovil', () => {
        it('Sign In Admin User', (done) => {            // test case 2
            let toSendData = {
                Usuario: "JAX007"
            } 
            request(app).post('/reportM/fetchReportMovil').send(toSendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() =>{
                mongoose.connection.db.collection("reportes").deleteOne({UAppMov_Usuario: "JAX007"})
                .catch((err) =>{
                    console.log(`Error: ${err}`);
                });
                mongoose.connection.db.collection("usuariosappmovils").deleteOne({Usuario: "JAX007"})
                .catch((err) =>{
                    console.log(`Error: ${err}`);
                });
            })
        });
    });
});
