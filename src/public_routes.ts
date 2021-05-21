
/**
 * Las rutas públicas son las URL de la API que cualquiera puede solicitar.
 * sin tener que iniciar sesión, por ejemplo:
 * 
 * POST /user es el punto final para crear un nuevo usuario o "registrarse".
 * POST /el token puede ser el punto final para "iniciar sesión" (generar un token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';

const router = Router();
/* Aqui van las rutas publicas */
// METODO POST
// Ruta de registro,| (safe -->) crea un nuevo usuario en la base de datos 
// ('/user',        |            con "createUser" que viene de "./actions"
//                  |            (Es la funcion grande jeje la primera de actions)
router.post('/user', safe(createUser));

export default router;
