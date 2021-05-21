import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'

/* NOTA IMPORTANTE: "Users" es una tabla de ".entities/Users" */

/* FUNCION PARA CREAR UN USUARIO */
export const createUser = async (req: Request, res:Response): Promise<Response> =>{
    /* ANTES DE CREAR UN USUARIO */
	// validaciones importantes para evitar errores ambiguos, el cliente debe comprender qué salió mal
	if(!req.body.first_name) throw new Exception("Please provide a first_name - Escriba un nombre porfavor")
	if(!req.body.last_name) throw new Exception("Please provide a last_name - Escriba un apellido porfavor")
	if(!req.body.email) throw new Exception("Please provide an email - Escriba un email porfavor")
	if(!req.body.password) throw new Exception("Please provide a password - Escriba una contraseña porfavor")

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

/* Leemos usuarios */
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
        /* Leemos TODOS (find) los usuarios de la BD (getRespository(tablaUsers)) */
        const users = await getRepository(Users).find();
        /* Damos una Respuesta */
		return res.json(users);
}
/* Eliminamos un usuario */
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
        /* guardamos en users | buscamos en la BD en la tabla Users un solo valor con el id req.params.id */
         const users = await getRepository(Users).findOne(req.params.id);
        /*(validamos si el usuario existe) */
        /*Si usuario es falso es que no existe */
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            /* user=result */
            /* Caso contrario, el usuario SI existe, entonces le pasamos el id de quien queremos borrar */
            const result = await getRepository(Users).delete(req.params.id);
            return res.json(result);
        }
}