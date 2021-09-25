
import { Persona } from '../model/persona';
import { TipoProducto } from '../model/tipoProducto';


export class Ficha {
    idFichaClinica!: number;
    fechaHora!: string;
    motivoConsulta!: string;
    diagnostico!: string;
    observacion!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    idTipoProducto!: TipoProducto;
}




