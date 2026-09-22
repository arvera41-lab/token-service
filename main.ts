import * as dotenv from 'dotenv';
import express from 'express';
import {TokenService} from './src/services/token.service';
import {AuthController} from './src/controllers/auth.controller'

// Encendemos la lectura de variables de entorno
dotenv.config();
const app = express();
app.use(express.json());

// Inicializamos e inyectamos las capas del microservicio por constructor
const servicio = new TokenService();
const controlador = new AuthController(servicio);
// Conectamos las rutas del controlador al servidor Express bajo el prefijo /api/auth
app.use('/api/auth',controlador.obtenerRouter());
// Obtenemos el puerto del endpoint
const PORT = process.env.PORT || 4000;
// Escudo global contra caídas accidentales en la terminal
process.on('uncaughtException',(err)=>{
    console.error(`\n [EXCEPCIÓN CRÍTICA EN GENERADOR DE LLAVES]: ${err.stack}`);
});
try{
    app.listen(PORT,()=>{
        console.log('=======================================================');
        console.log(`Servicio de llaves en escucha:`);
        console.log(`Enpoint: http://localhost:${PORT}/api/auth/token`);
        console.log('=======================================================');
    });

    setInterval(()=>{},86400000);

} catch(error : any){
    console.error(`Error catastrófico al levantar el puerto ${PORT}`,error.message);
}
console.log("Iniciando proyecto de token-service");