import * as path from 'path' 
import listEndpoints from 'express-list-endpoints' 
import ejs from "ejs" 

import { Request, Response, NextFunction } from 'express';
import { ObjectLiteral } from 'typeorm';


export const url = (port: number) => {
	let publicUrl = `http://localhost:${port}`;
	
	if(process.env.GITPOD_WORKSPACE_URL){
		const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
		publicUrl = `https://${port}-${host}`;
	}
	return publicUrl
}


export const renderIndex = async (_app: any, url: string) => {


	const routes = listEndpoints(_app).map((item: any) => {
		let endpoints: ObjectLiteral[] = []
		item.methods.forEach((e:string) => {
			endpoints.push({ method: e, path: item.path })
		})
		return endpoints
	}).flat()

	.filter((r:ObjectLiteral) => r.path != "/")
	
	
	let data = {
		host: url,
		routes,
		rigo: "https://github.com/4GeeksAcademy/expressjs-rest-hello/blob/master/docs/assets/rigo-baby.jpeg?raw=true",
		starter: "https://start.4geeksacademy.com/starters/express",

	}
	return new Promise((resolve, reject) => {
		
		ejs.renderFile(path.join(__dirname, "../docs/assets/template.ejs"), data as ejs.Data,(err, result) => {
		if (err) {
			reject(err);
		}
		 	resolve(result);
		});
	});
}



export const safe = (fn:any) => async (req: Request, res: Response, next: NextFunction) => {
	try{
		const fnReturn = await fn(req, res)
	}catch(err){
		res.status(err.status || 500);
		res.json({ message: err.message || err.msg || err });
		
		next(err);
	}
}

export class Exception extends Error{
	status: number = 400
	constructor(msg: string, status: number = 400){
		super();
		this.status = status || 400;
		this.message = msg;
	}
}