import { Component, OnInit } from '@angular/core';
import { HorarioExcepcion } from 'src/app/model/horarioExcepcion';
import { Persona } from 'src/app/model/persona';
import { ServiceempleadoService } from 'src/app/service/serviceempleado.service';
import { ServicehorarioexcepcionService } from 'src/app/service/servicehorarioexcepcion.service';

@Component({
  selector: 'app-agregarhorarioexcepcion',
  templateUrl: './agregarhorarioexcepcion.component.html',
  styleUrls: ['./agregarhorarioexcepcion.component.css']
})
export class AgregarhorarioexcepcionComponent implements OnInit {

  nuevohorario: HorarioExcepcion= new HorarioExcepcion();
  empleados: Persona[]=[];
  fechaSelec: Date = new Date();
  dia : string="";
  mes: string="";
  ano: string="";
  horaapercadenaSelec: string = "";
  horaciecadenaSelec: string = "";
  fechacadenaSelec: string="";
  horaAperturaSelec:string="";
  horaCierreSelec: string="";
  flagEsHabilitarSelec: string="";
  empleadoSelec: Persona = new Persona();
  minutosSelec: number=0;
  mensaje: string="";
  horaaper: string="";
  minaper: string="";
  horacie: string="";
  mincie: string="";


  constructor(private serviciohorarioexcepcion: ServicehorarioexcepcionService,private servicioEmpleado: ServiceempleadoService) { }

  ngOnInit(): void {
    
    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );
  }

  crearHorarioexcepcion(): void{

    this.horaaper= this.horaAperturaSelec.toString().substr(0,2);
    this.minaper= this.horaAperturaSelec.toString().substr(3,5);
    this.horacie= this.horaCierreSelec.toString().substr(0,2);
    this.mincie= this.horaCierreSelec.toString().substr(3,5);
    this.horaapercadenaSelec= this.horaaper+this.minaper;
    this.horaciecadenaSelec= this.horacie+this.mincie;

    //console.log(this.horaapercadenaSelec);
    //console.log(this.horaciecadenaSelec);

    this.ano= this.fechaSelec.toString().substr(0,4); 
    this.mes= this.fechaSelec.toString().substr(5,2);
    this.dia= this.fechaSelec.toString().substr(8,2);
    this.fechacadenaSelec= this.ano+this.mes+this.dia;

    this.nuevohorario.fechaCadena = this.fechacadenaSelec;
    this.nuevohorario.horaAperturaCadena = this.horaapercadenaSelec;
    this.nuevohorario.horaCierreCadena = this.horaciecadenaSelec;
    this.nuevohorario.flagEsHabilitar = this.flagEsHabilitarSelec;
    this.nuevohorario.idEmpleado = this.empleadoSelec;
    this.nuevohorario.intervaloMinutos = this.minutosSelec;

    //console.log(this.nuevohorario.fechaCadena);
    //console.log(this.nuevohorario.horaAperturaCadena);
    //console.log(this.nuevohorario.horaCierreCadena);
    //console.log(this.nuevohorario.flagEsHabilitar);
    //console.log(this.nuevohorario.idEmpleado.idPersona);
    //console.log(this.nuevohorario.intervaloMinutos);



    this.serviciohorarioexcepcion.postHorarioexcepcion({
      fechaCadena: this.nuevohorario.fechaCadena,
      horaAperturaCadena: this.nuevohorario.horaAperturaCadena,
      horaCierreCadena: this.nuevohorario.horaCierreCadena,
      flagEsHabilitar:  this.nuevohorario.flagEsHabilitar,
      idEmpleado:{
      idPersona: this.nuevohorario.idEmpleado.idPersona
      },
      intervaloMinutos: this.nuevohorario.intervaloMinutos}).subscribe(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

  }

}

