import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todos } from './entities/Todos'
import { Exception } from './utils'

/* NOTA IMPORTANTE: "Users" es una tabla de ".entities/Users" */

/* POST Creamos 1 usuario*/
export const createUser = async (req: Request, res:Response): Promise<Response> =>{
    /* ANTES DE CREAR UN USUARIOoo */
	// validaciones importantes para evitar errores ambiguos, el cliente debe comprender qué salió mal
	if(!req.body.first_name) throw new Exception("first_name - Escriba un nombre porfavor")
	if(!req.body.last_name) throw new Exception(" last_name - Escriba un apellido porfavor")
	if(!req.body.email) throw new Exception("email - Escriba un email porfavor")
	if(!req.body.password) throw new Exception("password - Escriba una contraseña porfavor")

    /* Nos guadamos a todos los usuarios en "userRepo" */
    const userRepo = getRepository(Users)
    
    /* VALIDAMOS QUE NADIE +MAS+ tenga ese mismo correo, tiene que ser Unico(unique) */
    // fetch for any user with this email - para cualquier usuario con este correo electrónico
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception(`Ya existe un usuario con este correo: ${user.email}`)
    
    /* Si cumple con todo correctamente, CREAMOS EL USUARIO */
	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}
/* Leemos TODOS los usuarios GET */
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
        /* Leemos TODOS (find) los usuarios de la BD (getRespository(tablaUsers)) */
        const users = await getRepository(Users).find();
        /* Damos una Respuesta */
		return res.json(users);
}
/* Eliminamos 1 usuario DELETE */
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
        /* guardamos en users | buscamos en la BD en la tabla Users un solo valor con el id req.params.id */
         const users = await getRepository(Users).findOne(req.params.id);
        /*(validamos si el usuario existe) */
        /*Si usuario es falso es que no existe */
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            /* Caso contrario, el usuario SI existe, entonces le pasamos el id de quien queremos borrar */
            const result = await getRepository(Users).delete(req.params.id);
            return res.json(result);
        }
}

/* ************************************************************************************** */
/* LEEMOS 1 SOLO GET segun el parametro*/
export const getUsersOne = async (req: Request, res: Response): Promise<Response> =>{
        const users = await getRepository(Users).findOne(req.params.id);
/*         const todos = await getRepository(Todos).findOne(req.body.id);
 */
        return res.json(users);
        /* No vemos nada porque no tienen tareas */
		/* return res.json(todos); */
}

/* ************************************************************************************** */
/* POST TODOS */
export const createUserTodos = async (req: Request, res:Response): Promise<Response> =>{
	
	if(!req.body.descripcion) throw new Exception("descripcion - Escriba una descripcion porfavor")
    /* Nos guadamos a todas las listas los usuarios en "userTodos" */
    const userTodos = getRepository(Users)
    
    /* VALIDAMOS QUE haya alguien con ese mismo id */
	const userTodo = await userTodos.findOne(req.params.id )
	if(userTodo) {
        /* Si cumple con todo correctamente, CREAMOS la lista */
/*        const newUserTodos = getRepository(Todos).create(req.body.descripcion);  //Creo una
        const results = await getRepository(Users).save(newUserTodos); //Grabo el nuevo usuario 
        return res.json(results); */
        let todos = new Todos();
        todos.descripcion = req.body.descripcion;
        todos.done = false;
        todos.users = userTodo;
        const results = await getRepository(Todos).save(todos); //
        return res.json(results);
    }else{
        return res.json("mesagger srgio un error");
    }
}

/* ************************************************************************************** */
/* Lemos la lista de 1 usuario */
export const getUsersTodos = async (req: Request, res: Response): Promise<Response> =>{
        //Primero validamos si existe el usuario para ver la lista
         const users = await getRepository(Users).findOne(req.params.id);
 
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            /* const result = await getRepository(Users).findOne(req.params.id); */
            const result = await getRepository(Todos).find(req.body.id);
            return res.json(result);
        }
}