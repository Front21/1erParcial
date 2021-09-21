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
  editarHorarioExcepcion(hid: number): void{
    console.log(this.horario.idHorarioExcepcion );
 
     this.servicioHorarioexcepcion.putHorarioExcepcion({fechaCadena: this.horario.fechaCadena, horaApertura:
      this.horario.horaAperturaCadena ,horaCierre: this.horario.horaCierreCadena,flagEsHabilitar: 
      this.horario.flagEsHabilitar, idEmpleado: this.horario.idEmpleado.idPersona, intervaloMinutos: 
      this.horario.intervaloMinutos}).subscribe(
       () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));
 
   }


  }


