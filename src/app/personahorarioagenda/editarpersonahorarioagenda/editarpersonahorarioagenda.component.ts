import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  horaapercadenaSelec: string = "";
  horaciecadenaSelec: string = "";
  horaAperturaSelec:string="";
  horaCierreSelec: string="";
  horaaper: string = "";
  minaper: string="";
  horacie: string="";
  mincie: string="";

  constructor(private route: ActivatedRoute, private servicioAgenda: PersonahorarioagendaService,
              private router: Router) { }

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

  async editarAgenda(): Promise<void>{
    console.log(this.agenda.idPersonaHorarioAgenda)
    console.log(this.agenda.dia)
    console.log(this.agenda.horaAperturaCadena)
    console.log(this.agenda.horaCierreCadena)
    console.log(this.agenda.intervaloMinutos)
    console.log(this.agenda.idEmpleado.idPersona)

    this.horaaper = this.horaAperturaSelec.toString().substr(0,2);
    this.minaper = this.horaAperturaSelec.toString().substr(3,5);
    this.horacie = this.horaCierreSelec.toString().substr(0,2);
    this.mincie = this.horaCierreSelec.toString().substr(3,5);
    this.horaapercadenaSelec= this.horaaper+this.minaper;
    this.horaciecadenaSelec= this.horacie+this.mincie;

    await this.servicioAgenda.putAgenda({

      idPersonaHorarioAgenda : this.agenda.idPersonaHorarioAgenda,
      dia : this.agenda.dia,
      horaAperturaCadena: this.horaapercadenaSelec,
      horaCierreCadena: this.horaciecadenaSelec,
      intervaloMinutos: this.agenda.intervaloMinutos,
      idEmpleado:{
        idPersona: this.agenda.idEmpleado.idPersona
      }}).then(
      () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));

    await this.irListadoAgenda();
  }

  async irListadoAgenda(): Promise<boolean>{
    return this.router.navigateByUrl('personahorarioagenda');
  }

}
