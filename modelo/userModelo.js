const mongoose = require('mongoose');
const { genSalt, hash } = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        cedula: {type :"string", unique: true, required: true, max:100},

        clave: {type :"string", required: true},

        nombre: {type :"string", required: true},

        email: {type :"string", required: true},

        placa1: {type :"string", required: true},

        placa2: {type :"string"},

        saldo: {type :"string", required: true},
    },
);

userSchema.pre("save",async function(next){//find, update, deleate, recibe un parametro next
    //mira en save la condicion que esta en los parametros en function. 
    // salt es lo que le agragamos a la clave para que sea más segura
    // debemos generar tanto el hasch como el salt
    const salt = await genSalt(10); // con gen Salt le decimos cuantas veces lo vamos a cifrar
    console.log(salt);
    this.clave = await hash(this.clave, salt);//Genera el Salt + el Hash(es el tipo de encriptacion)
    console.log(this.clave);
    next();// el next regresa user.save(function(error) en usuariosRuta
    
});


const userModelo = mongoose.model("user", userSchema);
exports.userModelo = userModelo;