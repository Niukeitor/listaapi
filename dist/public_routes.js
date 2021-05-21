"use strict";
exports.__esModule = true;
/**
 * Las rutas públicas son las URL de la API que cualquiera puede solicitar.
 * sin tener que iniciar sesión, por ejemplo:
 *
 * POST /user es el punto final para crear un nuevo usuario o "registrarse".
 * POST /el token puede ser el punto final para "iniciar sesión" (generar un token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
/* Aqui van las rutas publicas */
// METODO POST
// Ruta de registro,| (safe -->) crea un nuevo usuario en la base de datos 
// ('/user',        |            con "createUser" que viene de "./actions"
//                  |            (Es la funcion grande jeje la primera de actions)
router.post('/user', utils_1.safe(actions_1.createUser));
exports["default"] = router;
