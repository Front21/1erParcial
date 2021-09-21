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
  
  constructor(private serviciohorarioexcepcion: ServicehorarioexcepcionService,private servicioEmpleado: ServiceempleadoService,private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.serviciohorarioexcepcion.gethorarioExcepcion().subscribe(
      entity => this.horarios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

      
  this.route.queryParams.subscribe(params => {this.id = params['id'];});
  this.serviciohorarioexcepcion.getHorarioexcepcion(this.id).subscribe(
    entity => {this.horario.idHorarioExcepcion = entity.idHorarioExcepcion,this.horario.fechaCadena = entity.fechaCadena,
      this.horario.horaAperturaCadena = entity.horaAperturaCadena,this.horario.horaCierreCadena = entity.horaCierreCadena,
      this.horario.flagEsHabilitar = entity.flagEsHabilitar, this.horario.idEmpleado = entity.idEmpleado,
      this.horario.intervaloMinutos = entity.intervaloMinutos},
    error => console.log('No se pudo acceder a la Categoria')
  );

  }

  buscarhorarioexcepcion() : void{

    this.serviciohorarioexcepcion.gethorarioexcepcionEmpleados(this.empleadoSelec.idPersona).subscribe(
      entity => this.HorarioexcepcionFiltroEmpleado = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Horario Excepcion por Empleados'), 
    );

   

    this.ano= this.fechaSelec.toString().substr(0,4); 
    this.mes= this.fechaSelec.toString().substr(5,2);
    this.dia= this.fechaSelec.toString().substr(8,2);
    this.fechacadena= this.ano+this.mes+this.dia;

    this.serviciohorarioexcepcion.gethorarioexcepcionFechas(this.fechacadena).subscribe(
      entity => this.HorarioexcepcionFiltroFecha = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Horario Excepcion por Fecha'), 
    );



    for (var horarioExcepcion in this.horarios) {
      
      if(this.HorarioexcepcionFiltroEmpleado.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.HorarioexcepcionFiltroEmpleado){
          if(this.horarios[horarioExcepcion].idHorarioExcepcion==this.HorarioexcepcionFiltroEmpleado[f1].idHorarioExcepcion){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      
      if(this.HorarioexcepcionFiltroFecha.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.HorarioexcepcionFiltroFecha){
          if(this.horarios[horarioExcepcion].idHorarioExcepcion==this.HorarioexcepcionFiltroFecha[f1].idHorarioExcepcion){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      if(this.band==true && this.band2==true){
        this.horariosResultado[this.cont]=this.horarios[horarioExcepcion];
        this.cont=this.cont+1; 
      };
      this.band2=false;
      this.band=false; 
    };  
  };


  editarHorarioExcepcion(): void{
    console.log(this.id);
 
     this.serviciohorarioexcepcion.putHorarioExcepcion({fechaCadena: this.horario.fechaCadena, horaApertura:
      this.horario.horaAperturaCadena ,horaCierre: this.horario.horaCierreCadena,flagEsHabilitar: 
      this.horario.flagEsHabilitar, idEmpleado: this.horario.idEmpleado.idPersona, intervaloMinutos: 
      this.horario.intervaloMinutos}).subscribe(
       () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));
 
   }

  eliminarHorarioExcepcion(id: number): void{
    this.serviciohorarioexcepcion.deleteHorarioexcepcion(id).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
      this.refresh();
  }

  refresh(): void { window.location.reload(); }


  
}

