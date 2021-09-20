
import { Persona } from '../model/persona';


export class PersonaHorarioAgenda {
  idPersonaHorarioAgenda!: number;
  dia!: number;
  horaAperturaCadena!: string;
  horaCierreCadena!: string;
  intervaloMinutos!: number;
  idEmpleado!: Persona;

}
