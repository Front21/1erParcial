import { Producto } from "./producto";
import { SubCategoria } from "./subcategoria";


export class PresentacionProducto {

    idPresentacionProducto!: number;
    idProducto!: Producto;
    idTipoProducto!: SubCategoria;
    nombre!:string;
    descripcion!: string;
    
 
}