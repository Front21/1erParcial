import { Component, OnInit } from '@angular/core';
import { Paciente } from '../model/paciente';
import { Persona } from '../model/persona';
import { ServicepacientesService } from '../service/servicepacientes.service';
import {Sort} from "@angular/material/sort";

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
  mensaje: string = "";
  nombres: string[] = [];
  apellidos: string[] = [];
  listaFull: Persona[] = [];
  public page: number = 1;
  constructor(private servicioPaciente:ServicepacientesService) { }

  async ngOnInit(): Promise<void> {
  let ejemplo={
    soloUsuariosDelSistema: false
  }

    await this.servicioPaciente.getPacienteFiltro({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
      ejemplo : JSON.stringify(ejemplo)
    }).then(
      entity => this.listaPacientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );
    this.listaFull = this.listaPacientes;
    for (var nombre in this.listaPacientes){
        this.nombres[nombre]=this.listaPacientes[nombre].nombre;
    }
    for (var apellido in this.listaPacientes){
      this.apellidos[apellido]=this.listaPacientes[apellido].apellido;
    }

  }
  async buscar(active: string, direction: string, desdeSort: boolean): Promise<void>{
    let filtro;
    let params;

    if(!desdeSort){
      this.clicbuscar = true;
    }

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
    if (this.pacienteNombreSelec.idPersona == undefined && this.pacienteApellidoSelec.idPersona == undefined
    && this.clicbuscar == true){
      this.mensaje = "Selecciones opciones de busqueda."
    }else {
      if (this.clicbuscar) {
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
          ejemplo: JSON.stringify(filtro)
        }
      } else {
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
        }
      }

      await this.servicioPaciente.getPacienteFiltro(params).then(
        entity => this.listaPacientes = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Categorias'),
      );
      console.log("lenght" + this.PacienteResultado.length);
      console.log("nombre" + this.pacienteNombreSelec.idPersona);
      console.log("apellido" + this.pacienteApellidoSelec.idPersona);

    }
  }
  limpiar(): void{
    this.clicbuscar = false;
    this.servicioPaciente.getPacienteFiltro({
      orderBy: "idPersona",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.listaPacientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );
  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscar(sort.active, sort.direction, true);
  }

}



