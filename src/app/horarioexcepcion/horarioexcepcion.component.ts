import { Component, OnInit } from '@angular/core';
import { HorarioExcepcion } from '../model/horarioExcepcion';
import { Persona } from '../model/persona';
import { ServicehorarioexcepcionService } from '../service/servicehorarioexcepcion.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ActivatedRoute } from '@angular/router';


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
  fechacadena: string="";
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
  
  constructor(private serviciohorarioexcepcion: ServicehorarioexcepcionService,private servicioEmpleado: ServiceempleadoService,private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.serviciohorarioexcepcion.gethorarioExcepcion().subscribe(
      entity => this.horarios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Horario Excepcion')
    );

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

  }

  async buscarhorarioexcepcion() : Promise<void>{

    this.clickBuscar = true;

    if(this.empleadoSelec.idPersona != undefined){
      await this.serviciohorarioexcepcion.gethorarioexcepcionEmpleados(this.empleadoSelec.idPersona).then(
        entity => this.HorarioexcepcionFiltroEmpleado= entity.lista,
        error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
      );
    }

   
    this.ano= this.fechaSelec.toString().substr(0,4); 
    this.mes= this.fechaSelec.toString().substr(5,2);
    this.dia= this.fechaSelec.toString().substr(8,2);
    this.fechacadena= this.ano+this.mes+this.dia;
   
    if(this.fechacadena != undefined){
      await this.serviciohorarioexcepcion.gethorarioexcepcionFechas(this.fechacadena).then(
        entity => this.HorarioexcepcionFiltroFecha = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Horario Excepcion por Fecha'), 
      );
    }

    this.horariosResultado=[];
    this.actualizarResultadoFiltro();

  }


  actualizarResultadoFiltro(): void{
    for (var horario in this.horarios) {
      this.band2 = false; //criterio: asegura que todas las listas no hayan sido vacias por no seleccionar nada
      if(this.HorarioexcepcionFiltroEmpleado.length>0){
        this.band2=true;
        this.band=false; //criterio si no se encuentra en una lista cargada, se debe rechazar
          for (var s1 in this.HorarioexcepcionFiltroEmpleado){
            if(this.horarios[horario].idHorarioExcepcion==this.HorarioexcepcionFiltroEmpleado[s1].idHorarioExcepcion){
              this.band=true;
              break;
            }
          }
          if(this.band==false){
            continue;
          }
          //this.band = false;
      }else{
        if(this.empleadoSelec.idPersona != 0 && this.empleadoSelec.idPersona != undefined){
          continue;
        }
      }

      if(this.HorarioexcepcionFiltroFecha.length>0){
        console.log("ENTRO A FECHA");
        this.band2=true;
        this.band=false;
        for (var s1 in this.HorarioexcepcionFiltroFecha){
          if(this.horarios[horario].idHorarioExcepcion==this.HorarioexcepcionFiltroFecha[s1].idHorarioExcepcion){
            this.band=true;
            break;
          };
        };
        if(this.band==false){
          continue;
        };
      }else{
        if(this.fechacadena != ""){
          continue;
        }
      }

      if(this.band2==true){
        this.horariosResultado.push(this.horarios[horario]);
      }
    }

  
  };
  
  limpiar(): void{
    this.clickBuscar = false;
    this.horariosResultado = [];
  }


}

