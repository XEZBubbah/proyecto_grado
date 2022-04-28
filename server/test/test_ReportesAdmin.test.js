const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
var report_id = "";

describe('Reportes Admin web', () => {
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

    describe('POST: /fetchAllReports', () => {
        it('Fetch All Reports Created by Mobile Users', (done) => {            // test case 1
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", Apellido: "Martinez", Usuario: "JAX007", Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404", Correo: "luis66@gmail.com", Contraseña: "123" 
            }).then((res) => {
                mongoose.connection.db.collection("reportes").insertOne({
                    Asunto: "Reporte de prueba :D", Descripcion: "Testing en Mocha",
                    Tipo_Reporte: "Usuario", Usuario: "JAX007"
                }).then((res) => {
                    report_id = res.insertedId;
                    request(app).post('/reportA/fetchAllReports').send({})
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
    
    describe('GET: /:id', () => {
        it('Fetch User Mobile Report by Its ID', (done) => {            // test case 2
            request(app).get(`/reportA/${report_id}`).send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /editReport', () => {
        it('Edit User Mobile Report', (done) => {            // test case 2
            let sendData = {
                Report_Id: report_id, 
                Estado: "F"
            }
            console.log(sendData);
            request(app).post("/reportA/editReport").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /getReportsNuevos', () => {
        it('Fetch New User Mobile Reports', (done) => {            // test case 2
            request(app).get("/reportA/getReportsNuevos").send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /getReportsProceso', () => {
        it('Fetch In Process State User Mobile Reports', (done) => {            // test case 2
            request(app).get("/reportA/getReportsProceso").send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /getReportsCompleto', () => {
        it('Fetch Concluded User Mobile Reports Process', (done) => {            // test case 2
            request(app).get("/reportA/getReportsCompleto").send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });
    
    describe('POST: /deleteReport', () => {
        it('Delete User Mobile Report', (done) => {            // test case 2
            let sendData = { Report_Id: report_id };
            request(app).post("/reportA/deleteReport").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() => {
                mongoose.connection.db.collection("usuariosappmovils").deleteOne({Usuario: "JAX007"})
                .catch((err) =>{
                    console.log(`Error: ${err}`);
                });
            });
        });
    });
});
