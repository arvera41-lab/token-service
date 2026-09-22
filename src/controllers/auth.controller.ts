import {Router,Request, Response} from 'express';
import {ITokenService} from '../interfaces/auth.interface';
import {LoginDTO} from '../dtos/auth.dto';
import { log } from 'node:console';

export class AuthController{
    private service:ITokenService;
    private router:Router;

    constructor(servicioInyectado: ITokenService){
        this.service = servicioInyectado;
        this.router = Router();

        this.configurarRutas();
    }

    public configurarRutas():void{
        // Creamos el endpint POST /api/auth/token
        this.router.post('/token',this.solicitarLlaveAcceso.bind(this));
    }
    public solicitarLlaveAcceso(req:Request,res:Response):void{
        console.log(`[AUTH CONTROLLER]: Petición de generación de llave recibida.`);
        try{
                // 1. Capturamos los campos que el usuario manda en el body de Postman
                const {usuario,contrasenia} = req.body;
                // 2. Empaquetamos los datos en un DTO
                const loginDto = new LoginDTO(usuario,contrasenia);
                // 3. Validamos credenciales
                const isvalido = this.service.validarCredencialesMaestras(loginDto);
                if(!isvalido){
                    // Si están mal, respondemos 401 (No Autorizado) y detenemos el servicio
                    res.status(401).json(
                        {
                            status:"error",
                            message: "Acceso denegado: Usuario o contraseña incorrectos"
                        }
                    );
                    return;
                }

                const tokenGenerado = this.service.generarTokenSeguro(loginDto.usuario);
                // Devolvemos el token generado
            res.status(200).json(
                {
                    status:"success",
                    token: tokenGenerado,
                    tipo_token:"Barer",
                    expiración:"3 minutos",
                }
            );
        }catch(error: any){
            res.status(500).json({
                status:"error",
                message:error.message
            });
        }
    }
    public obtenerRouter():Router{
        return this.router;
    }
}