const mongooseConnect = require('../models/mongoDBConnect');
const mongoose = require('mongoose');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
var user_id = ""

describe('Itinerary Mobile User', () => {
    before((done) => { 
        mongooseConnect.dbconnect().once('open', () => done()).on('error',(error) => done(error))
    });

    beforeEach((done) => {
        mongoose.connection.db.listCollections({name: "itinerarios"})
        .next((error,collection) => {
            if(collection) done()
            else done(error)
        });
    });

    after((done) => { 
        mongooseConnect.dbclose().then(() => done()).catch((err)=>done(err));
    })

    describe('POST: /createItinerary', () => {
        it('Create Mobile User Itinerary', (done) => {            // test case 1
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Luis", Apellido: "Martinez", Usuario: "JAX007", Fecha_Nacimiento:"07-12-2000",
                Celular: "3103918404", Correo: "luis66@gmail.com", Contraseña: "123" 
            }).then((res) => {
                mongoose.connection.db.collection("grupos").insertOne({
                    Nombre_Grupo: "Grupo prueba 1",
                    Descripcion: "Grupo de pruebas",
                    Visibilidad: true,
                    Permiso: 'A',
                    Contraseña_Grupo: "",
                    UAppMov_Id: res.insertedId,
                    UAppMov_Usuario: "JAX007"
                }).then((res) => {
                    let sendData = {
                        Nombre_Itinerario: "PruebaTour1", 
                        Hora_Salida: "09:15", 
                        Hora_Llegada: "", 
                        Punto_Partida: {latitud: 6.989971425740447, longitud: -73.06107718017584}, 
                        Punto_Llegada: {latitud: 6.991419700202432, longitud: -73.0400486616162}, 
                        Descripcion: "Bicirutas la novena", 
                        Usuario: "JAX007", 
                        Nombre_Grupo: "Grupo prueba 1"
                    }
                    request(app).post('/itineraryM/createItinerary').send(sendData)
                    .then((res) => {
                        expect(res.statusCode).to.equal(202);
                        done();
                    }).catch((err) => done(err))
                }).catch((err) => done(err))
            }).catch((err) => {
                console.log(`Error: ${err}`);
                done();
            });
        });
    });

    describe('POST: /getGroupItineraries', () => {
        it('Fetch Itineraries Within a Group', (done) => {            // test case 2
            let sendData = { Usuario: "JAX007", Grupo: "Grupo prueba 1"};
            request(app).post("/itineraryM/getGroupItineraries").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /getUserItineraries', () => {
        it('Fetch User Itineraries', (done) => {            // test case 2
            let sendData = { Usuario: "JAX007", Grupo: "Grupo prueba 1"};
            request(app).post("/itineraryM/getUserItineraries").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });

    describe('POST: /getUserItinerary', () => {
        it('Fetch User Itinerary in Detail', (done) => {            // test case 2
            let sendData = { Usuario: "JAX007", Grupo: "Grupo prueba 1"};
            request(app).post("/itineraryM/getUserItinerary").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });
    
    describe('POST: /vinculateToItinerary', () => {
        it('Vinculate A User To An Existing Itinerary', (done) => {            // test case 2
            mongoose.connection.db.collection("usuariosappmovils").insertOne({
                Nombre: "Pedro", Apellido: "Rodriguez", Usuario: "JAX008", Fecha_Nacimiento:"12-04-2005",
                Celular: "313378950", Correo: "Pedro00@gmail.com", Contraseña: "1234" 
            }).then((res) => {
                mongoose.connection.db.collection("grupos").insertOne({
                    Nombre_Grupo: "Grupo prueba 1",
                    Descripcion: "Grupo de pruebas",
                    Visibilidad: true,
                    Permiso: 'I',
                    Contraseña_Grupo: "",
                    UAppMov_Id: res.insertedId,
                    UAppMov_Usuario: "JAX008"
                }).then((res) => {
                    let sendData = { 
                        Usuario: "JAX008",
                        Grupo: "Grupo prueba 1",
                        Itinerario: "PruebaTour1"
                    };                    
                    request(app).post("/itineraryM/vinculateToItinerary").send(sendData)
                    .then((res) => {
                        expect(res.statusCode).to.equal(200);
                        done();
                    }).catch((err) => done(err))
                }).catch((err) => {
                    console.log(`Error: ${err}`);
                    done();
                });
            }).catch((err) => {
                console.log(`Error: ${err}`);
                done();
            });
        });
    });

    describe('POST: /editItinerary', () => {
        it('Edit A User Itinerary And All Its References', (done) => {            // test case 2
            let sendData = { 
                Nombre_ItinerarioNew: "PruebaTour1Modified",
                Nombre_ItinerarioOld: "PruebaTour1", 
                Hora_Salida: "11:15", 
                Hora_Llegada: "", 
                Punto_Partida: {latitud: 8.989971425740447, longitud: -63.06107718017584}, 
                Punto_Llegada: {latitud: 15.991419700202432, longitud: -70.0400486616162}, 
                Descripcion: "BiciAventuras Bucaramanga", 
                Usuario: "JAX007", 
                Nombre_Grupo: "Grupo prueba 1"
            };
            request(app).post("/itineraryM/editItinerary").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err))
        });
    });
    
    describe('POST: /deleteItinerary', () => {
        it('Delete A User Itinerary And All Its References', (done) => {            // test case 2
            let sendData = { 
                Usuario: "JAX007",
                Grupo: "Grupo prueba 1",
                Itinerario: "PruebaTour1Modified"
            };  
            request(app).post("/itineraryM/deleteItinerary").send(sendData)
            .then((res) => {
                expect(res.statusCode).to.equal(200);
                done();
            }).catch((err) => done(err)).finally(() =>{
                mongoose.connection.db.collection("usuariosappmovils").deleteMany({
                    Usuario: { $in: ["JAX007","JAX008"]}
                }).catch((err) => {console.log(`Error Usuarios: ${err}`);});
            })
        });
    });
});
