import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ficha } from 'src/app/model/ficha';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import {PersonaHorarioAgenda} from "../../model/personaHorarioAgenda";
import {PersonahorarioagendaService} from "../../service/personahorarioagenda.service";

@Component({
  selector: 'app-editarpersonahorarioagenda',
  templateUrl: './editarpersonahorarioagenda.component.html',
  styleUrls: ['./editarpersonahorarioagenda.component.css']
})
export class EditarpersonahorarioagendaComponent implements OnInit {
  id: number=0;
  agenda: PersonaHorarioAgenda = new PersonaHorarioAgenda();
  mensaje: string = "";

  constructor(private route: ActivatedRoute, private servicioAgenda: PersonahorarioagendaService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {this.id = params['id'];});
    this.servicioAgenda.getAgenda(this.id).subscribe(
      entity => {this.agenda.idPersonaHorarioAgenda = entity.idPersonaHorarioAgenda,
        this.agenda.dia = entity.dia,
        this.agenda.horaAperturaCadena = entity.horaAperturaCadena,
        this.agenda.horaCierreCadena = entity.horaCierreCadena,
        this.agenda.intervaloMinutos = entity.intervaloMinutos,
        this.agenda.idEmpleado = entity.idEmpleado},
      error => console.log('No se pudo acceder a la Ficha')
    );
  }

  editarAgenda(): void{
    console.log(this.agenda.idPersonaHorarioAgenda)
    console.log(this.agenda.dia)
    console.log(this.agenda.horaAperturaCadena)
    console.log(this.agenda.horaCierreCadena)
    console.log(this.agenda.intervaloMinutos)
    console.log(this.agenda.idEmpleado.idPersona)

    this.servicioAgenda.putAgenda({
      idPersonaHorarioAgenda : this.agenda.idPersonaHorarioAgenda,
      dia : this.agenda.dia,
      horaAperturaCadena: this.agenda.horaAperturaCadena,
      horaCierreCadena: this.agenda.horaCierreCadena,
      intervaloMinutos: this.agenda.intervaloMinutos,
      idEmpleado:{
        idPersona: this.agenda.idEmpleado.idPersona
      }}).subscribe(
      () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));

  }

}
