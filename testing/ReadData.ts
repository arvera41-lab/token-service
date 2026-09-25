import fs from 'fs';
import path from 'path';
import {IRawData,IJSONData} from './testing.interface'


const rootfile = path.join(process.cwd(),'src','config','db_data.json');
const rootfile2 = path.join(__dirname,'data_testing.json');
const rootfile3 = path.join(__dirname,'data_new.json');

console.log('Ruta: 01');
console.log(rootfile);
console.log('Ruta: 02');
console.log(rootfile2);
console.log('Ruta: 03');
console.log(rootfile3);

const contenidoRaw = fs.readFileSync(rootfile2,'utf-8');
const datosPalpables:IJSONData[] = JSON.parse(contenidoRaw);

const datanewraw= fs.readFileSync(rootfile3,'utf-8');
const datanew:IRawData[] = JSON.parse(datanewraw);


const dbdata:IJSONData[] =  datanew.map((item)=>{
    return {
        fiid       :item.id
       ,fcnombre   :item.nombre
       ,fiidedad   :item.edad
       ,fiidstatus :item.status
    }
});
console.log("Nueva data:");
console.log(dbdata);
// const nuevoarreglo = dbdata.filter((i)=>{
//     const istrue = datosPalpables.some((x)=>{
//         return (x.fiid === i.fiid || x.fcnombre === i.fcnombre) && x.fiidstatus === i.fiidstatus;
//     });
    
//     return !istrue;
// });
// datosPalpables.push(...nuevoarreglo);
console.log('-------------------------------------------');
console.log('Validación de existencia de datos:');
dbdata.forEach((x)=>{
    const existente= datosPalpables.find((y)=>{
        return y.fiid === x.fiid
    });
    if(existente){
        let count=0;
        if(existente.fcnombre !== x.fcnombre){
            existente.fcnombre = x.fcnombre;
            count=count+1;
        }else if(existente.fiidedad !== x.fiidedad){
            existente.fiidedad = x.fiidedad;
            count=count+1;
        }else if(existente.fiidstatus !== x.fiidstatus){
            existente.fiidstatus = x.fiidstatus;
            count=count+1;
        }

        if(count > 0 ){
            console.log(`Registro actualizado: ${existente.fiid}`);
        }else{
            console.log(`Registro ${existente.fiid} existente, no se actualizó ningun campo`);
        }
        
    }else {
        datosPalpables.push(x);
        console.log(`Nuevo registro insertado: ${x.fiid}`);
    }
});
console.log('-------------------------------------------');
console.log('Contenido:');
console.log(datosPalpables);
console.log('-------------------------------------------');

console.log('Inserción de datos en archivo JSON...')

const textofinal = JSON.stringify(datosPalpables,null,2);

console.log(`Datos a insertar en el archivo: ${rootfile2}`);
console.log(textofinal);
console.log('-------------------------------------------');
fs.writeFileSync(rootfile2,textofinal,'utf-8');
console.log('-------------------------------------------');
console.log('Datos guardados en archivo');