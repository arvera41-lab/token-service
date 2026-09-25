import {JsonDatabase} from '@balda/json-db-service';
import path from 'node:path';

const rootfile = path.join(__dirname,'data_testing.json');

const jsondata = new JsonDatabase(rootfile);

const listadatos = jsondata.obtenerUsuarios();

console.log(listadatos);