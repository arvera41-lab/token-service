import fs from 'fs';
import path from 'path';
import {IJSONData} from './testing.interface'

interface DataUsuario extends IJSONData{
    fiid       :number;
    fcnombre   :string;
    fiidedad   :number;
    fiidstatus :number;
    // Agregamos los nuevos campos como opcionales (?) porque se crean en caliente
    fdfecha?: string;
    fchora?: string;
    fcclasificacion?: string;
    fcdepartamento?: string;
}

// Definición de ruta
const rootfile = path.join(__dirname,'data_testing.json');

// Obtenemos los datos
const dataraw = fs.readFileSync(rootfile,'utf-8');
// Convertimos texto plano a objetos de Javascript
const dataformat: DataUsuario[]= JSON.parse(dataraw);

// Interfaz para el acumulador
interface Metricas{
    totalusuarios:number;
    totalmenores:number;
    totalmayores:number;
    totedadesmen:number;
    totedadesmay:number;
    totaledades :number;
}

const fecha = new Date();
const hora = new Date();

const resultado = dataformat.reduce((acc:Metricas, x:any) => {
    
    x.fdfecha = fecha.toLocaleDateString();
    x.fchora  = hora.toLocaleTimeString();

    if(x.fiidedad < 18){
        x.fcclasificacion = "Menor de edad";
        x.fdfecha = '10/2/2026';
    } else {
        x.fcclasificacion = "Mayor de edad";
    }

    if(x.fiidedad < 20){
        x.fcdepartamento = "Contabilidad";
    }else if(x.fiidedad < 30){
        x.fcdepartamento = "Desarrollo";
    }else {
        x.fcdepartamento = "Gestión";
    }
    
    acc.totalusuarios +=1;
    acc.totaledades   +=x.fiidedad;

    if(x.fiidedad < 18){
        acc.totalmenores +=1;
        acc.totedadesmen += x.fiidedad;
    }else {
        acc.totalmayores +=1;
        acc.totedadesmay += x.fiidedad;
    }
    return acc;
},{
    totalusuarios : 0
   ,totalmenores  : 0
   ,totalmayores  : 0 
   ,totedadesmen  : 0
   ,totedadesmay  : 0
   ,totaledades   : 0
});

// dataformat.push(resultado);
// imprimimos valores
console.log('----------------------------------------------');
console.log('Data');
console.log('----------------------------------------------');
console.log(dataformat);
console.log('----------------------------------------------');
console.log(resultado);
console.log('----------------------------------------------');

// Ordenamiento de elementos por edades
const datamenor = dataformat.sort((a,b)=>{
     const resultado = a.fiidedad - b.fiidedad;
     return resultado
}).filter((a)=> a.fiidedad > 20 && a.fiidedad < 30 );

const febrero = dataformat.filter((a) => {
    if(!a.fdfecha) return false;
    
    const [dia,mes,anio] = a.fdfecha.split('/');

    const mesNumero = Number(mes);
    return mesNumero === 2;

});

// console.log(dataformat);
// console.log(datamenor);

console.log(new Date().toISOString());
console.log('----------------------------------------------');
console.log(febrero);