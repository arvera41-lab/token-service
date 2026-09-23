
// Mapeador de Base de datos: Reflejo de la tabla uesqtech.tokens y sus columnas
export interface ITokenFilaBD{
    fiidtokens     :number;
    fctoken        :string;
    fcusuario      :string;
    fccontrasenia  :string;
    fistatus       :number;
    fdcreateddate  :Date;
    fdmodifieddate :Date;
}

// Entidad de negocio: Nombres limpios para el código typescript
// Es como quiero usar el objeto dentro de la aplicación tras leerlo de la BD
export interface ITokenEntidad{
    id       :number;
    token    :string;
    usuario  :string;
    status   :number;
}