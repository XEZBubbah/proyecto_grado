const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
var user_id = ""

describe('Mobile Alerts', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "alertasmapas"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => { 
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /setAlert', () => {
        it('Create Mobile Alerts', (done) => {            // test case 1
            let sendData = {
                Nombre_Alerta: "Trafico pesado",
                Descripcion: "Se registra mucho flujo vehicular en la via",
                latitude: 8.989971425740447, 
                longitude: -63.06107718017584
            }
            request(app).post('/alertaM/setAlert').send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('GET: /fetchAlerts', () => {
        it('Fetch Mobile Alerts Within a Range of 2 Hours', (done) => {            // test case 1
            request(app).get('/alertaM/fetchAlerts').send({})
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() => {
                mongoose.connection.db.collection("alertasmapas").deleteOne({ 
                    Nombre_Alerta: "Trafico pesado",
                    Descripcion: "Se registra mucho flujo vehicular en la via",
                    latitude: 8.989971425740447, 
                    longitude: -63.06107718017584
                }).catch((err) =>{
                    console.log(`Error: ${err}`);
                });
            });
        });
    });
});
