import express from "express";
import fs from 'fs';
import path from "path";
import {IJSONData, IRawData} from './testing.interface';
import {verificarApiKeyGlobal} from './middleware';
import {validarUsuarioMiddlaware} from './validar.middleware'

// InSTANCIAR express
const app = express();
const PORT = 3002;

// Permitir express entienda formato JSON
app.use(express.json());
app.use((req,res,next)=>{
    const hora = new Date().toLocaleTimeString();
    console.log(`[${hora}] - Petición entrante: ${req.method} a la ruta ${req.url}`);
    next();
});
// Definición de ruta de mi archivo de datos
const rootfile = path.join(__dirname,'data_testing.json');

// Activación de middleware
// app.use(verificarApiKeyGlobal);
// Endopoint de prueba
app.get('/api/usuarios',verificarApiKeyGlobal,(req,res)=>{
    try{
        const contenidoRaw = fs.readFileSync(rootfile,'utf-8');
        const datos:IJSONData[] = JSON.parse(contenidoRaw);

        // Respuesta del Endopoint
        res.status(201).json({
            status:"Success"
           ,data:datos
           ,message:"Información de usuarios obtenida con éxito" 
        });
    }catch(error){
        res.status(500).json({
            status:"error",
            message:"Error en la data"
        }
        );
    }
});

app.get('/api/usuarios/:id',verificarApiKeyGlobal,(req,res)=>{
        
    try{
        const userid= Number(req.params.id);

        const dataraw = fs.readFileSync(rootfile,'utf-8');
        const data:IJSONData[]= JSON.parse(dataraw);

        // Buscamos el ID
        const userencontrado = data.find((x)=>x.fiid === userid);
        if(!userencontrado){
            res.status(401).json({
                status:"fail"
               ,message:`ID: ${userid} No encontrado.` 
            });
            return;
        }
        res.status(201).json({
                status:"success"
               ,userdata:userencontrado 
               ,message:`ID:${userid} encontrado en la data` 
            });
    }catch(error){
        res.status(500).json({
            status:"error"
           ,message:"ID no identificado en la data"
        });
    }
});

app.post('/api/usuarios/alta',verificarApiKeyGlobal,validarUsuarioMiddlaware,(req,res,next)=>{
    try{

        const datapet:IRawData[] = req.body;
        if(!datapet){
            res.status(401).json({
                status:"Undefined"
               ,message:"Se requieren datos correctos." 
            });
            return;
        }

        const dataraw = fs.readFileSync(rootfile,'utf-8');
        const data:IJSONData[] = JSON.parse(dataraw);

        datapet.forEach((x) => {
            const encopntrado = data.find((y)=> y.fiid === x.id);
            if(encopntrado){
                let count = 0;
                if(encopntrado.fcnombre !== x.nombre){
                    console.log(`[Campo]: fcnombre: ${encopntrado.fcnombre} -> ${x.nombre}`);
                    encopntrado.fcnombre = x.nombre;
                    count=count+1;
                }
                if(encopntrado.fiidedad !== x.edad){
                    console.log(`[Campo]: fiidedad: ${encopntrado.fiidedad} -> ${x.edad}`);
                    encopntrado.fiidedad = x.edad;
                    count=count+1;
                }
                if(encopntrado.fiidstatus !== x.status){
                    console.log(`[Campo]: fiidstatus: ${encopntrado.fiidstatus} -> ${x.status}`);
                    encopntrado.fiidstatus = x.status;
                    count=count+1;
                }

                if(count > 0){
                    console.log(`${encopntrado.fiid}: Acualizado`);
                }
            }else {
                const insertdata:IJSONData = {
                    fiid:x.id
                   ,fcnombre:x.nombre
                   ,fiidedad:x.edad
                   ,fiidstatus:x.status 
                };
                data.push(insertdata);
                console.log(`Valor insertado`);
            }
        });
        const datasort = [...data].sort((a,b)=>a.fiid - b.fiid);
        const textoplano = JSON.stringify(datasort,null,2);
        fs.writeFileSync(rootfile,textoplano,'utf-8');
        console.log("Elemento insertado:");
        res.status(201).json({
            status:"Successful"
           ,message:"Elemento guardado"
           ,data:datasort
        });
    }catch(error){
        res.status(500).json({
            status:"error"
           ,message:"Revisar url de petición."
        });
        next(error);
    }

});

app.listen(PORT,()=>{
    console.log(`--------------------------------------`);
    console.log('Servidor corriendo en la siguiente url:')
    console.log(`http://localhost:${PORT}/api/usuarios`);
    console.log(`--------------------------------------`);
});