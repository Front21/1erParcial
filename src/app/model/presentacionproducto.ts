import { Producto } from "./producto";
import { SubCategoria } from "./subcategoria";
import { ExistenciaProducto } from "./existenciaProducto";


export class PresentacionProducto {

    idPresentacionProducto!: number;
    idProducto!: Producto;
    idTipoProducto!: SubCategoria;
    nombre!:string;
    descripcion!: string;
    existenciaProducto!: ExistenciaProducto;
    
 
}