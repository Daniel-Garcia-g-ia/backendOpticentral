const ENV = require('../config/index');
const user = require('../src/components/user/network');
const login = require('../src/components/login/network')


const routes = function (server) {
    server.use(ENV.config.url, user);
    server.use(ENV.config.url, login);
}



module.exports = routes