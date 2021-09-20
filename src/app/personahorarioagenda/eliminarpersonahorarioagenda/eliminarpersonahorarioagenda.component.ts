import { Component, NgZone, OnInit } from '@angular/core';
import { Ficha } from 'src/app/model/ficha';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { ActivatedRoute, Router } from '@angular/router';
import {PersonahorarioagendaService} from "../../service/personahorarioagenda.service";

@Component({
  selector: 'app-eliminarpersonahorarioagenda',
  templateUrl: './eliminarpersonahorarioagenda.component.html',
  styleUrls: ['./eliminarpersonahorarioagenda.component.css']
})
export class EliminarpersonahorarioagendaComponent implements OnInit {
  mensaje: string ="";
  id: number = 0;
  constructor(private route: ActivatedRoute, private servicioAgenda: PersonahorarioagendaService, private router: Router,private zone:NgZone) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarAgenda();
    this.irListadoAgenda();
  }

  async irListadoAgenda(): Promise<boolean>{
    return this.router.navigateByUrl('personahorarioagenda');
  }


  async eliminarAgenda(): Promise<void>{
    await this.servicioAgenda.deleteAgenda(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}
