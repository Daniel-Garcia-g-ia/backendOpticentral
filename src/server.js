const express = require('express');
const ENV = require ('../config/index');
const db = require ('./db');
const router = require ('../network/routes')

//mongodb+srv://danielg1393:Ff0itkw5fmPtboWQ@cluster0.5ftmkqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
db(`mongodb+srv://${ENV.config.db_user}:${ENV.config.db_pass}@cluster0.5ftmkqd.mongodb.net/${ENV.config.db_name}?retryWrites=true&w=majority&appName=Cluster0`)



const app = express();

router(app)



app.listen(ENV.config.port, () => {
    console.log(`Servidor escuchando por le puerto ${ENV.config.port}`);
});
