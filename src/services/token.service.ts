import * as crypto from 'crypto';
import {ITokenService} from '../interfaces/auth.interface';
import {LoginDTO} from '../dtos/auth.dto';

export class TokenService implements ITokenService{
    private algoritmo = process.env.ALGORITMO || 'aes-256-cbc';
    private llaveSecreta: Buffer;

    constructor(){
        const claveStr = process.env.SHARED_SECRET_KEY;
        // Validación obligatoria: El Algoritmo AES-256 requiere exactamente 32 caracteres
        if(claveStr?.length !== 32){
            throw new Error("[CONFIG ERROR]: La variable SHARED_SECRET_KEY en el archivo .env debe medir 32 caracteres.");
        }
        // Transoformamos el string a un bloque de bytes crudos (Buffer)
        this.llaveSecreta = Buffer.from(claveStr);
    }

    public validarCredencialesMaestras(dto: LoginDTO): boolean {

        return dto.usuario === 'admin_universidad' && dto.contrasenia === 'Abc12345';
    }
    public generarTokenSeguro(usuario: string): string {
        const tiempoExpiracion = Date.now() + (3*60*1000);
        // Creamos el objeto de datos con la información que queremos esconder dentro del token
        const informacionOculta = {
            user:usuario,
            expira:tiempoExpiracion //Insertamos el tiempo limite
        };
        // Convertimos el JSON en texto plano
        const textoPlanoToken = JSON.stringify(informacionOculta);
        // Generamos un vector de inicialización (IV) único y aleatorio de 16 bytes por seguridad
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algoritmo,this.llaveSecreta,iv);
        // Ciframos el texto
        let textoEncriptado = cipher.update(textoPlanoToken,'utf8','hex');
        textoEncriptado +=cipher.final('hex');
        // Formato Portable: Unimos el IV y el texto encriptado usando un punto "."
        // Así el cliente de Postman recibe un solo string fácil de copiar y pegar
        return `${iv.toString('hex')}.${textoEncriptado}`;
        
    }

}