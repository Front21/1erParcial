import { Component, OnInit } from '@angular/core';
import { Paciente } from '../model/paciente';
import { Persona } from '../model/persona';
import { ServicepacientesService } from '../service/servicepacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  listaPacientes: Persona[]=[];
  pacienteNombreSelec: Persona = new Persona();
  pacienteApellidoSelec: Persona = new Persona();
  PacienteFiltroNombre: Persona[]=[];
  PacienteFiltroApellido: Persona[]=[];
  PacienteResultado: Persona[]=[];
  cont: number =0;
  paciente: Persona = new Persona();
  band: boolean = false;
  band2: boolean = false;
  clicbuscar: boolean = false;
  constructor(private servicioPaciente:ServicepacientesService) { }
  
  ngOnInit(): void {
    this.servicioPaciente.getPaciente().subscribe(
      entity => this.listaPacientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );
  }
  async buscar(): Promise<void>{
    let filtro;
    this.clicbuscar = true;
    if (this.pacienteNombreSelec.idPersona != undefined && this.pacienteApellidoSelec.idPersona != undefined){
      filtro = {
        nombre : this.pacienteNombreSelec.nombre,
        apellido: this.pacienteApellidoSelec.apellido
      }
    }
    if (this.pacienteNombreSelec.idPersona != undefined && this.pacienteApellidoSelec.idPersona == undefined){
      filtro = {
        nombre : this.pacienteNombreSelec.nombre
      }
    }
    if (this.pacienteNombreSelec.idPersona == undefined && this.pacienteApellidoSelec.idPersona != undefined){
      filtro = {
        apellido: this.pacienteApellidoSelec.apellido
      }
    } 
    await this.servicioPaciente.getPacienteFiltro(filtro).then(
      entity => this.PacienteResultado = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'), 
    );
    console.log("lenght"+this.PacienteResultado.length);
    console.log("nombre"+this.pacienteNombreSelec.idPersona);
    console.log("apellido"+this.pacienteApellidoSelec.idPersona);
    
  };
  limpiar(): void{
    this.clicbuscar = false;
    this.PacienteResultado = [];
  }
  
}
