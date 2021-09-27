import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicepacientesService } from 'src/app/service/servicepacientes.service';

@Component({
  selector: 'app-agregarpaciente',
  templateUrl: './agregarpaciente.component.html',
  styleUrls: ['./agregarpaciente.component.css']
})
export class AgregarpacienteComponent implements OnInit {
  NombrePaciente: string = "";
  ApellidoPaciente: string = "";
  EmailPaciente: string = "";
  TelefonoPaciente: string = "";
  RucPaciente: string = "";
  CedulaPaciente: string = "";
  TipoPersonaPaciente: string = "";
  FechaNacimientoPaciente: Date = new Date();
  mensaje: string="";
  constructor(private servicioPaciente: ServicepacientesService, private router: Router) { }

  ngOnInit(): void {
  }
  async crearPaciente(): Promise<void>{
    console.log("nombre"+this.NombrePaciente);
    console.log("apellido"+this.ApellidoPaciente);
    console.log("email"+this.EmailPaciente);
    console.log("telf"+this.TelefonoPaciente);
    console.log("ruc"+this.RucPaciente);
    console.log("ci"+this.CedulaPaciente);
    console.log("tipoPersona"+this.TipoPersonaPaciente);
    console.log("fechanac"+this.FechaNacimientoPaciente);
    await this.servicioPaciente.postPaciente({
      nombre: this.NombrePaciente,
      apellido: this.ApellidoPaciente,
      email: this.EmailPaciente,
      telefono: this.TelefonoPaciente,
      ruc: this.RucPaciente,
      cedula: this.CedulaPaciente,
      tipoPersona: this.TipoPersonaPaciente,
      fechaNacimiento: this.FechaNacimientoPaciente.toString()+" 00:00:00"
    }).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irListadoPaciente();
  }

  async irListadoPaciente(): Promise<boolean>{
    return this.router.navigateByUrl('pacientes');
  }
}
