import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { ServicepacientesService } from 'src/app/service/servicepacientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminarpaciente',
  templateUrl: './eliminarpaciente.component.html',
  styleUrls: ['./eliminarpaciente.component.css']
})
export class EliminarpacienteComponent implements OnInit {

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

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarPaciente();
    //this.router.navigate( [routerLink]="['/ficha']");
    //this.ngZone.run(() => this.router.navigateByUrl('/ficha'))
    /*
    this.zone.run(() => {
      this.router.navigate(['/ficha'] );
    });*/
    await this.irListadoFicha();

  }

  async irListadoFicha(): Promise<boolean>{
    return this.router.navigateByUrl('paciente');
  }


  async eliminarPaciente(): Promise<void>{
    await this.servicioPaciente.eliminarPaciente(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}

