const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();


//Base de datos
dbConnection();

//Cors
app.use(cors())

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());
//RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Lectura del body



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})


