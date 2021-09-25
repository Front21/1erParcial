import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HorarioExcepcion } from 'src/app/model/horarioExcepcion';
import { Persona } from 'src/app/model/persona';
import { ServicehorarioexcepcionService } from 'src/app/service/servicehorarioexcepcion.service';

@Component({
  selector: 'app-editarhorarioexcepcion',
  templateUrl: './editarhorarioexcepcion.component.html',
  styleUrls: ['./editarhorarioexcepcion.component.css']
})
export class EditarhorarioexcepcionComponent implements OnInit {
  mensaje: string ="";
  id: number = 0;
  horario: HorarioExcepcion = new HorarioExcepcion();
  empleados: Persona [] = [];
  fechaSelec: Date = new Date();
  fechaCadena: string="";
  dia : string="";
  mes: string="";
  ano: string="";
  horaapercadenaSelec: string = "";
  horaciecadenaSelec: string = "";
  fechaCadenaSelec: string="";
  horaAperturaCadena:string="";
  horaCierreCadena: string="";
  flagEsHabilitarSelec: string="";
  empleadoSelec: Persona = new Persona();
  minutosSelec: number=0;
  horaaper: string="";
  minaper: string="";
  horacie: string="";
  mincie: string="";
  horaAperturaCadenaSelec: string="";
  horaCierreCadenaSelec: string="";
  constructor(private route: ActivatedRoute, private servicioHorarioexcepcion: ServicehorarioexcepcionService) { }

  ngOnInit(): void {

  this.route.queryParams.subscribe(params => {this.id = params['id'];});
  this.servicioHorarioexcepcion.getHorarioexcepcion(this.id).subscribe(
    entity => {this.horario.idHorarioExcepcion = entity.idHorarioExcepcion,this.horario.fechaCadena = entity.fechaCadena,
      this.horario.horaAperturaCadena = entity.horaAperturaCadena,this.horario.horaCierreCadena = entity.horaCierreCadena,
      this.horario.flagEsHabilitar = entity.flagEsHabilitar, this.horario.idEmpleado = entity.idEmpleado,
      this.horario.intervaloMinutos = entity.intervaloMinutos},
    error => console.log('No se pudo acceder a la Categoria')
  );


  }

  editarHorarioExcepcion(): void{


    console.log(this.fechaCadenaSelec);
    this.ano= this.fechaCadenaSelec.toString().substr(0,4); 
    this.mes= this.fechaCadenaSelec.toString().substr(5,2);
    this.dia= this.fechaCadenaSelec.toString().substr(8,2);
    this.fechaCadena= this.ano+this.mes+this.dia;
    console.log(this.fechaCadena);

    this.horaaper= this.horaAperturaCadenaSelec.toString().substr(0,2);
    this.minaper= this.horaAperturaCadenaSelec.toString().substr(3,5);
    this.horacie= this.horaCierreCadenaSelec.toString().substr(0,2);
    this.mincie= this.horaCierreCadenaSelec.toString().substr(3,5);
    this.horaAperturaCadena= this.horaaper+this.minaper;
    this.horaCierreCadena= this.horacie+this.mincie;

    console.log(this.horaapercadenaSelec);
    console.log(this.horaciecadenaSelec);


    console.log(this.horario.idHorarioExcepcion );
    console.log(this.horario.idEmpleado);
 
     this.servicioHorarioexcepcion.putHorarioExcepcion(
      {idHorarioExcepcion:this.horario.idHorarioExcepcion, 
        fechaCadena:this.horario.fechaCadena, 
        horaAperturaCadena:this.horario.horaAperturaCadena,
        horaCierreCadena:this.horario.horaCierreCadena,
        flagEsHabilitar:this.horario.flagEsHabilitar, 
      idEmpleado:{
        idPersona: this.horario.idEmpleado.idPersona}, 
      intervaloMinutos:this.horario.intervaloMinutos}).subscribe(
       () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));
 
   }
  }


