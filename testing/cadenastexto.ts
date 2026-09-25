import { text } from "node:stream/consumers";


const texto = "El usuario se llama Fernando y tiene 25 años";
const existe = texto.toLocaleLowerCase().includes("fernando");

console.log(existe);

// Expresiones regulares
const regex = /fernando/i;
const existe2 = regex.test("El usuario se llama FERNANDO");

const palabra = "usu"
const filtrotext= new RegExp(palabra,"i");

const istrue = filtrotext.test(texto);
console.log(istrue);