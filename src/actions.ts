import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  
import { Users } from './entities/Users'
import { Todos } from './entities/Todos'
import { Exception } from './utils'


export const createUser = async (req: Request, res:Response): Promise<Response> =>{
	if(!req.body.first_name) throw new Exception("first_name - Escriba un nombre porfavor")
	if(!req.body.last_name) throw new Exception(" last_name - Escriba un apellido porfavor")
	if(!req.body.email) throw new Exception("email - Escriba un email porfavor")
	if(!req.body.password) throw new Exception("password - Escriba una contraseña porfavor")

 
    const userRepo = getRepository(Users)
    
  
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception(`Ya existe un usuario con este correo: ${user.email}`)
   
	const newUser = getRepository(Users).create(req.body); 
	const results = await getRepository(Users).save(newUser); 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
 
    const users = await getRepository(Users).find();
   
    return res.json(users);
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
        
         const users = await getRepository(Users).findOne(req.params.id);
       
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
       
	 
            const result = await getRepository(Todos).delete({users: users});
            await getRepository(Users).delete(users);
            return res.json(result);
        }
}


export const getUsersOne = async (req: Request, res: Response): Promise<Response> =>{
        const users = await getRepository(Users).findOne(req.params.id);
        return res.json(users);
}


export const createUserTodos = async (req: Request, res:Response): Promise<Response> =>{
    
   
    if(!req.body.descripcion) throw new Exception("descripcion - Escriba una descripcion porfavor")
    
  
    const userTodos = getRepository(Users)
    

	const userTodo = await userTodos.findOne(req.params.id)
	if(userTodo) {
        
        let todos = new Todos();
        
        todos.descripcion = req.body.descripcion;
        todos.done = false;
      
        todos.users = userTodo;
        
        const results = await getRepository(Todos).save(todos);
        return res.json(results);
    }else{
        return res.json("mesagger srgio un error");
    }
}

export const getUsersTodos = async (req: Request, res: Response): Promise<Response> =>{
 
         const users = await getRepository(Users).findOne(req.params.id);
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            
            const result = await getRepository(Todos).find({where: {users: users}});
            return res.json(result);
        }
}


export const updateTodos = async (req: Request, res: Response): Promise<Response> =>{
	
        const todos = await getRepository(Todos).findOne(req.params.id);
        if(todos){
           
            getRepository(Todos).merge(todos, req.body); 
	    
            const results = await getRepository(Todos).save(todos)
            return res.json(results);
        }
        return res.json({msg: "Usuario no encontrado"})
}
