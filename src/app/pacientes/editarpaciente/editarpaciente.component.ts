import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { ServicepacientesService } from 'src/app/service/servicepacientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editarpaciente',
  templateUrl: './editarpaciente.component.html',
  styleUrls: ['./editarpaciente.component.css']
})
export class EditarpacienteComponent implements OnInit {
  id: number = 0;
  NombrePaciente: string = "";
  ApellidoPaciente: string = "";
  EmailPaciente: string = "";
  TelefonoPaciente: string = "";
  RucPaciente: string = "";
  CedulaPaciente: string = "";
  TipoPersonaPaciente: string = "";
  FechaNacimientoPaciente: Date = new Date();
  mensaje: string="";
  PacienteResultado: Persona[]=[];
  persona: Persona = new Persona();
  constructor(private route: ActivatedRoute, private servicioPaciente:ServicepacientesService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.id = params['id'];});
    let filtro;
    console.log("id", this.id);
    filtro = {
      idPersona: this.id
    }
    await this.servicioPaciente.getPacienteEditar(this.id).then(
      entity => this.persona = entity,
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'), 
    );
    console.log("lista pacientes"+this.persona)
  }
  async editarPaciente(): Promise<void>{
    console.log("nombre"+this.NombrePaciente);
    console.log("apellido"+this.ApellidoPaciente);
    console.log("email"+this.EmailPaciente);
    console.log("telf"+this.TelefonoPaciente);
    console.log("ruc"+this.RucPaciente);
    console.log("ci"+this.CedulaPaciente);
    console.log("tipoPersona"+this.TipoPersonaPaciente);
    console.log("fechanac"+this.FechaNacimientoPaciente);
    await this.servicioPaciente.putPaciente({
      idPersona: this.persona.idPersona,
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      email: this.persona.email,
      telefono: this.persona.telefono,
      ruc: this.persona.ruc,
      cedula: this.persona.cedula,
      tipoPersona: this.persona.tipoPersona,
      fechaNacimiento: this.persona.fechaNacimiento.toString()+" 00:00:00"
    }).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irListadoPaciente();
  }
  async irListadoPaciente(): Promise<boolean>{
    return this.router.navigateByUrl('pacientes');
  }

}
