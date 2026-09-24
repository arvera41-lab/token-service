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
       ,fcnombre   :item.name
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
dbdata.forEach((x)=>{
    const existente= datosPalpables.find((y)=>{
        y.fiid === x.fiid
    });
    if(existente){
        existente.fcnombre = x.fcnombre;
        existente.fiidedad = x.fiidedad;
        existente.fiidstatus = x.fiidstatus;
        console.log(`Registro actualizado: ${existente.fiid}`);
    }else {
        datosPalpables.push(x);
        console.log(`Nuevo registro insertado: ${x.fiid}`);
    }
});
console.log('Contenido:');
console.log(datosPalpables);

const textofinal = JSON.stringify(datosPalpables,null,2);

fs.writeFileSync(rootfile2,textofinal,'utf-8');
console.log('Datos guardados en archivo');