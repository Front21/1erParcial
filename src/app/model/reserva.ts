import { Ficha } from "./ficha";
import { Persona } from "./persona";

export class Reserva {

    idReserva!: number;
    fechaCadena!: string;
    fechaDesdeCadena!: string;
    fechaHastaCadena!: string;
    horaInicioCadena!: string;
    horaFinCadena!: string;
    fechaHoraCreacion!: string;
    flagEstado!: string;
    flagAsistio!: string;
    observacion!: string;
    idFichaClinica!: Ficha;
    idCliente!: Persona;
    idEmpleado!: Persona;
    
}