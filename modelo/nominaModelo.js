const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nominaSchema = new Schema(
    {
        cedula: {type :"string", unique: true, required: true, max:100},

        nombre: {type :"string", required: true},

        puesto: {type :"string", required: true},

        sueldo: {type :"string", required: true},

    },
);


const nominaModelo = mongoose.model("nomina", nominaSchema);
exports.nominaModelo = nominaModelo;