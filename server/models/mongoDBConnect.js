const mongoose = require("mongoose");

exports.dbconnect = function(app,PORT) {
    var db_name = process.env.DATABASE_NAME;
    if(process.env.NODE_ENV == 'testing') db_name = 'testCiclorrutaDB'; 
    const CONNECTION_URL = `mongodb+srv://${process.env.USER}:${process.env.PASS}@clusterciclorrutas.jp40z.mongodb.net/${db_name}?retryWrites=true&w=majority`;
        mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));
    return mongoose.connection;
}
  
exports.dbclose = function() {
    return mongoose.disconnect();
}