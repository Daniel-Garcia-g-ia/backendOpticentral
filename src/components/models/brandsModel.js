const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bransSchema = new Schema({
    brands: {
        type: Map, // Usamos Map para claves dinámicas
        of: new Schema({
            theorecalTime: {
                type: Number, // Validamos que sea un número
                required: true // Hacemos que sea obligatorio
            }
        })
    }
});

const model = mongoose.model('brands', bransSchema);

module.exports = model;