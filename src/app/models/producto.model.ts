import { Marca } from "./marca.model";
import { Pais } from "./pais.model";

export class Producto {
    
    idProducto: number=0;
    nombre: String="";
    serie: String="";
    durabilidad: String="";
    fechaVigencia: String="";
    precio: number=0;
    stock: number=0;
    marca?: Marca;
    marcaAux?:String;
    paisAux?:String;
    pais?: Pais;
    estado: number=1;
    fechaRegistro: String="";
}
