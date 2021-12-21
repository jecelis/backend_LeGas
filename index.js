const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require('cors');
app.use(express.json());
app.use(cors());

const {userRuta} = require("./rutas/userRuta");
app.use("/", userRuta);

/* require("dotenv").config(); */

//Conexion en la base de datos
mongoose.connect("mongodb://localhost:27017/user")
.then(res => console.log("Estoy conectado a la base de datos"))
.catch(err => console.log("Error", err))
//Conexion en la base de datos


app.listen(8081, function(){
    console.log("Mi aplicación corre en el puerto 8081")
})