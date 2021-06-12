import 'express-async-errors'
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderIndex } from "./utils"
import privateRoutes from './private_routes'
import publicRoutes from './public_routes'


const PORT:number = 3001;
const PUBLIC_URL = url(PORT)
const app = express();


const connectionPromess = createConnection();


app.use(cors()) 
app.use(express.json()) 
app.use(morgan('dev')); 


app.get('/', (req, res) => renderIndex(app, PUBLIC_URL).then(html => res.status(404).send(html)))



app.use(publicRoutes);



 

app.use(privateRoutes);


app.use( (req, res) => res.status(404).json({ "message": "Not found" }))


app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
   Open ${PUBLIC_URL} in your browser.`
	)
);