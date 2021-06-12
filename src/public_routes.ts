 
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import * as actions from './actions';

const router = Router();


router.post('/user', safe(createUser));


router.get('/user', safe(actions.getUsers));


router.get('/user/:id', safe(actions.getUsersOne));


router.get('/todos/:id', safe(actions.getUsersTodos));


 router.delete('/user/:id', safe(actions.deleteUser)); 


router.post('/todos/:id', safe(actions.createUserTodos));


router.put('/todos/:id', safe(actions.updateTodos));

export default router;
