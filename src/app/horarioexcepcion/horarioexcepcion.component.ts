import { Component, OnInit } from '@angular/core';
import { HorarioExcepcion } from '../model/horarioExcepcion';
import { Persona } from '../model/persona';
import { ServicehorarioexcepcionService } from '../service/servicehorarioexcepcion.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ActivatedRoute } from '@angular/router';
import {Sort} from "@angular/material/sort";


@Component({
  selector: 'app-horarioexcepcion',
  templateUrl: './horarioexcepcion.component.html',
  styleUrls: ['./horarioexcepcion.component.css']
})
export class HorarioexcepcionComponent implements OnInit {

  horarios: HorarioExcepcion[]=[];
  horariosResultado: HorarioExcepcion[]=[];
  HorarioexcepcionFiltroEmpleado: HorarioExcepcion[]=[];
  HorarioexcepcionFiltroFecha: HorarioExcepcion[]=[];
  empleados: Persona[]=[];
  empleadoSelec: Persona = new Persona();
  fechacadena: any;
  fechaSelec: Date = new Date();
  dia : string="";
  mes: string="";
  ano: string="";
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  mensaje: string="";
  id: number = 0;
  horario: HorarioExcepcion = new HorarioExcepcion();
  clickBuscar: boolean = false;
  chechFechaDesde: boolean = false;
  chechFechaHasta: boolean = false;
  public page: number =1;

  constructor(private serviciohorarioexcepcion: ServicehorarioexcepcionService,private servicioEmpleado: ServiceempleadoService,private route: ActivatedRoute ) { }

  ngOnInit(): void {

    let ejemplo={
      soloUsuariosDelSistema: true
    }

    
    this.serviciohorarioexcepcion.getHorarioExcepcionP({
      orderBy: "idHorarioExcepcion",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.horarios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

    this.servicioEmpleado.getEmpleadosP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
      ejemplo : JSON.stringify(ejemplo)
    }).then(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

  }

  async buscar(active: string, direction: string, desdeSort: boolean): Promise<void>{

    if(!desdeSort){
      this.clickBuscar = true;
    }

    let params;
    let ejemplo;

    this.ano= this.fechaSelec.toString().substr(0,4);
    this.mes= this.fechaSelec.toString().substr(5,2);
    this.dia= this.fechaSelec.toString().substr(8,2);
    this.fechacadena= this.ano+this.mes+this.dia;

    if(this.empleadoSelec.idPersona != undefined && this.fechacadena != undefined){
      ejemplo = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        },
        fechaCadena: this.fechacadena
      }
    }

    if(this.empleadoSelec.idPersona == undefined && this.fechacadena != undefined){
      ejemplo = {
        fechaCadena: this.fechacadena
      }
    }

    if(this.empleadoSelec.idPersona != undefined && this.fechacadena == undefined){
      ejemplo = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        }
      }
    }

    if(this.empleadoSelec.idPersona == undefined && this.fechacadena == undefined && this.clickBuscar == true){
      this.mensaje = "Es necesario marcar opciones de busqueda."
    }else{
      if(this.clickBuscar){
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
          ejemplo: JSON.stringify(ejemplo)
        }
      }else{
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
        }
      }

      

    }
    console.log(params);
      await this.serviciohorarioexcepcion.getHorarioExcepcionP(params).then(
        entity => {this.horarios = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );


  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscar(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = true;
    await this.serviciohorarioexcepcion.getHorarioExcepcionP({
      orderBy: "idHorarioExcepcion",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.horarios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }

}

