
export interface IRawData{
    id:number;
    nombre:string;
    edad?:number;
    status:number;
}
export interface IDataReturn{
    idnumber:number;
    idname:string;
    edad:number;
    estado:number
}
export interface IJSONData{
     fiid       :number              
    ,fcnombre   :string                  
    ,fiidedad   ?:number                  
    ,fiidstatus :number                    
}
