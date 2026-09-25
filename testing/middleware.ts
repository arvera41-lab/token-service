import {Request,Response,NextFunction} from 'express';

// Definición del Middleware Global
export const verificarApiKeyGlobal = (req:Request,res:Response,next:NextFunction)=>{
    const header       = 'x-api-key';
    const headerapiKey = req.get(`${header}`);
    const valuexapikey = 'Universidad2026';

    if(!headerapiKey || headerapiKey !== valuexapikey){
        res.status(401).json({
            status:"error"
           ,message:`Acceso denegado: Cabecera ${header} invalida o ausente` 
        });
        return;
    }
    next();
};