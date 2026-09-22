export interface ILoginDTO{
    usuario:string;
    contrasenia:string;
}

export class LoginDTO implements ILoginDTO {
    public usuario: string;
    public contrasenia: string;

    constructor(usuario:string,contrasenia:string){
        this.usuario = usuario;
        this.contrasenia = contrasenia;
    }
}