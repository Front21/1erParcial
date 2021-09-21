import { Persona } from "./persona";

export class HorarioExcepcion {
    idHorarioExcepcion!: number;
    fechaCadena!: string;
    horaAperturaCadena!: string;
    horaCierreCadena!: string;
    flagEsHabilitar!: string;
    idEmpleado!: Persona;
    intervaloMinutos!: number;
}