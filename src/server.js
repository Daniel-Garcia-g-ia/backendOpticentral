const express = require('express');
const ENV = require('../config/index');
const cors = require('cors');
const db = require('./db');
const router = require('../network/routes');
const bodyParser = require('body-parser');

// Función para inicializar el servidor

// Conectando a MongoDB


db(`mongodb+srv://danielg1393:${ENV.config.db_pass}@cluster0.5ftmkqd.mongodb.net/${ENV.config.db_name}?retryWrites=true&w=majority&appName=Cluster0`);


// Crear aplicación de Express
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Configurar las rutas
router(app);

// Iniciar el servidor
app.listen(ENV.config.port, () => {
    console.log(`Servidor escuchando por el puerto ${ENV.config.port}`);
});



