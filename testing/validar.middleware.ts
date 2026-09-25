import {Request,Response,NextFunction} from 'express';
import {z,ZodError} from "zod";

// Definición del esquema estricto con respecto al API
export const usuarioSchema = z.object({
    id:z.number().int().positive("El id debe ser un número positivo")
   ,nombre:z.string().trim().min(2,"El nombre debe tener al menos 2 caracteres")
   ,edad: z.number().int().positive().min(15,"Edad mínima permitica es 15 años").max(100)
   ,status: z.number().int().min(0).max(1,"El estatus debe ser 0 o 1")
});

export const ListaUsuariosSchema = z.array(usuarioSchema);
//  Middleware encargado de interceptar el req.body
export const validarUsuarioMiddlaware = (req:Request,res:Response,next:NextFunction)=>{
    try{
        // Valida la estructura del req.body. Si falla, lanza un error.
            ListaUsuariosSchema.parse(req.body);
        // Si los datos son válidos, pasamos al controlador
        next();
    }catch(error:any){
        if(error instanceof ZodError){
            res.status(400).json({
                status: "error"
               ,data: req.body
               ,message: "Datos enviados inválidos o corruptos"
               // Mapeamos los errores para que Postman devuelva exactamente qué campo falló
               ,detalles: error.issues.map(err => ({
                    campo: err.path.join('.'),
                    error: err.message
                }))
            });
            return;
        }
        res.status(500).json({ status: "error", message: "Error interno en la validación" });
    }
};