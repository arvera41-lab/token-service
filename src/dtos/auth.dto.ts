export interface ILoginDTO{
    usuario:string;
    contrasenia:string;
}

export class LoginDTO implements ILoginDTO {
    public usuario: string;
    public contrasenia: string;

    constructor(datos:Partial<ILoginDTO>){

        if(!datos.usuario || typeof datos.usuario !== 'string'){
            throw new Error('El Campo usuario es obligatorio y debe ser texto');
        }
        if(!datos.contrasenia || typeof datos.contrasenia !== 'string' || datos.contrasenia.length < 6){
            throw new Error('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
        }
        this.usuario = datos.usuario;
        this.contrasenia = datos.contrasenia;
    }
}