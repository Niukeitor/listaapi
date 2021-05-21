 
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import * as actions from './actions';

const router = Router();
 /* POST 1 user */
router.post('/user', safe(createUser));

// METODO GET TODOS LOS USUARIOS
router.get('/todos', safe(actions.getUsers));

/* METODO GET 1 lista de usuario */
router.get('/todos/:id', safe(actions.getUsersTodos));

/* METODO DELETE 1 USUARIO*/
 router.delete('/user/:id', safe(actions.deleteUser)); 

 /* ****************************************************************************************** */
/* Leemos 1 solo usuario */
router.get('/user/:id', safe(actions.getUsersOne));
 /* ****************************************************************************************** */
/* creamos 1 sola lista segun el id */
router.post('/todos/:id', safe(actions.createUserTodos));

export default router;
