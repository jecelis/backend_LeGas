const { Router } = require("express");
const userRuta = Router();
const { userModelo } = require("../modelo/userModelo");
const { saldoModelo } = require("../modelo/saldoModelo");
const { nominaModelo } = require("../modelo/nominaModelo");
const { compare } = require("bcrypt");

// Contruimos la API
userRuta.post("/ingresar", async function (req, res) {
  try {
    console.log("Estoy en el back");
    // 1. Capturo la información del cliente
    const { cedula, clave } = req.body;
    console.log(cedula);
    console.log(clave);
    // 2. Busco en la base de datos el usuario
    const usuario = await userModelo.findOne({ cedula });
    console.log(usuario);

    // 3. Pregunto si existe(Si exsite verifico su password)

    if (!usuario) {
      return res
        .status(401)
        .send({ estado: "Error", msg: "Credenciales no validas" });
    }

    //4. Comprobar password

    const passOk = compare(clave, usuario.clave);
    console.log(clave);
    console.log(usuario.clave);
    if (passOk) {
      console.log("Clave correcta");
      /* const token = sign({usuario : user.usuario , role: user.role}, process.env.JWT_SECRET_KEY); */ // enviamos un json, debemos saber tanto el usr como el rol
      return res.status(200).send({ estado: "Ok", msg: "Usuario logeado" });
    } else {
      return res
        .status(401)
        .send({ estado: "Error", msg: "Credenciales no validas" });
    }
  } catch (error) {
    console.log(error);
  }
});

userRuta.post("/guardar", function (req, res) {
  const dato = req.body; // Recuperar los datos que vienen del cliente
  const user = new userModelo(dato); // Utilizamos el modelo para drle los datos, (Usuario y clave)
  user.save(function (error) {
    //Usamos save para guardar la funcion
    console.log(user);
    console.log(error);
    if (error) {
      // con res enviamos la respuesta de si exitio un error
      return res
        .status(401)
        .send({ estado: "Error", msg: "Usuario no creado" });
    }
    return res.status(200).send({ estado: "Ok", msg: "Usuario creado" });
  });
});

userRuta.post("/Gestion", function (req, res) {
  const datos2 = req.body; // Recuperar los datos que vienen del cliente
  const stock = new saldoModelo(datos2); // Utilizamos el modelo para drle los datos, (Usuario y clave)
  stock.save(function (error) {
    //Usamos save para guardar la funcion
    console.log(stock);
    console.log(error);
    if (error) {
      // con res enviamos la respuesta de si exitio un error
      return res
        .status(401)
        .send({ estado: "Error", msg: "Datos no guardados" });
    }
    return res.status(200).send({ estado: "Ok", msg: "Datos guardados" });
  });
});

userRuta.post("/nomina", function (req, res) {
  const dato3 = req.body; // Recuperar los datos que vienen del cliente
  const nomina = new nominaModelo(dato3); // Utilizamos el modelo para drle los datos, (Usuario y clave)
  nomina.save(function (error) {
    //Usamos save para guardar la funcion
    console.log(nomina);
    console.log(error);
    if (error) {
      // con res enviamos la respuesta de si existio un error
      return res
        .status(401)
        .send({ estado: "Error", msg: "Empleado no creado" });
    }
    return res.status(200).send({ estado: "Ok", msg: "Empleado creado" });
  });
});

userRuta.post("/consultar", function (req,res){
  const {cedula} = req.body;
  nominaModelo.findOne({cedula},function(error,emp){
      if(error){
          return res.status(401).send({estado : "Error", msg : "Empleado no encontrado"});
      }
      else{
          if(emp!==null){
              return res.status(200).send({estado : "Ok", msg : "Empleado encontrado", dato:emp});
              
          }
          else{
              return res.send({estado : "Error", msg : "Empleado NO encontrado"});
          }
      }
  })
});

userRuta.post("/actualizar", function (req,res){
  const dato = req.body;
  if(dato.cedula !== null && dato.cedula !== ""){
    console.log(dato.cedula);
    nominaModelo.updateOne(
        {cedula : dato.cedula}, 
        {$set:{nombre : dato.nombre, puesto : dato.puesto, sueldo : dato.sueldo}},
        
        function (error){
            if(error){
                return res.status(401).send({estado : "Error", msg : "Empleado no actualizado"});
            }
            return res.status(200).send({estado : "Ok", msg : "Empleado actualizado"});
        }
        )
}
});

userRuta.post("/eliminar", function (req,res){
  const dato = req.body;
  if(dato !== null && dato !== ""){
    console.log(dato);
    nominaModelo.deleteOne(
        {cedula : dato.cedula}, 
        
        function (error){
            if(error){
                return res.status(401).send({estado : "Error", msg : "Empleado no eliminado"});
            }
            return res.status(200).send({estado : "Ok", msg : "Empleado eliminado"});
        }
        )
}
});

exports.userRuta = userRuta;
