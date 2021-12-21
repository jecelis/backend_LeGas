const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saldoSchema = new Schema(
    {
        precioCte: {type :"number"},

        precioExtra: {type :"number"},

        precioDiesel: {type :"number"},

        stockCte: {type :"number"},

        stockExtra: {type :"number"},

        stockDiesel: {type :"number"},
    },
);


const saldoModelo = mongoose.model("saldo", saldoSchema);
exports.saldoModelo = saldoModelo;