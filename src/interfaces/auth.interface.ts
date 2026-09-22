import {LoginDTO} from '../dtos/auth.dto';

export interface ITokenService{
    // Firma que valida si el usuario y la contraseña maestra coinciden
    validarCredencialesMaestras(dto:LoginDTO):boolean;

    // Firma que recibe el nombre del usuario y fabrica la llave cifrada de 3 min
    generarTokenSeguro(usuario:string):string;
}