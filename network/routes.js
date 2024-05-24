const ENV = require('../config/index');
const login = require('../src/components/login/network')
const equiments = require ('../src/components/equipments/network')
const process = require ('../src/components/process/network')


const routes = function (server) {    
    server.use(ENV.config.url, login);
    server.use(ENV.config.url, equiments);
    server.use(ENV.config.url, process);
    

}



module.exports = routes