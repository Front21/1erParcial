import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { ServiceclienteService } from 'src/app/service/servicecliente.service';
import { ServiceempleadoService } from 'src/app/service/serviceempleado.service';
import { ServicereservaService } from 'src/app/service/servicereserva.service';

@Component({
  selector: 'app-editarreserva',
  templateUrl: './editarreserva.component.html',
  styleUrls: ['./editarreserva.component.css']
})
export class EditarreservaComponent implements OnInit {

  reserva: Reserva = new Reserva();
  mensaje: string="";
  idReserva: number = 0;
  asistioSelec: string = "";
  observacionSelec: string = "";


  constructor( private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService,
               private route: ActivatedRoute,
               private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.idReserva = params['id'];});
    await this.servicioReserva.getReserva(this.idReserva).then(
      entity => this.reserva = entity,
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
    );

  }

  async editarReserva(id: number, asistioSelec: string, obervacionSelec: string): Promise<void>{
    console.log(asistioSelec);
    console.log(obervacionSelec);

   await this.servicioReserva.putReserva(
      {idReserva:id, observacion:obervacionSelec, flagAsistio: asistioSelec}).then(
      () => {this.mensaje='Asistio exitosamente'},error => console.log("error: "+error));

   await this.irListadoReserva();

  }

  async irListadoReserva(): Promise<boolean>{
    return this.router.navigateByUrl('reserva');
  }




}
