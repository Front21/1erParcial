import {PresentacionProducto} from "./presentacionproducto";
import {Servicio} from "./servicio";


export class Detalle {
  idServicioDetalle!: number;
  cantidad!: number;
  idPresentacionProducto!: PresentacionProducto;
  idServicio!: Servicio;
}
