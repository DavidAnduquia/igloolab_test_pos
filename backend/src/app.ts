import express from 'express';
import { Router, Request, Response } from "express";
import routerProduct from './routes/producto.routes';
import cors from 'cors';

const app = express();
const port = 3030;

//-- Middlewares
app.use(cors()); // Habilitando CORS para todas las solicitudes
app.use(express.json()); // Permite trabajar con JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Soporta datos codificados en URL


app.get('/', (req: Request, res: Response) => {
    res.send('¡Hola, Bienvenido');
});

// Rutas API
app.use('/', routerProduct);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
});