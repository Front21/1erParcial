import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceclienteService } from 'src/app/service/servicecliente.service';
import { ServiceempleadoService } from 'src/app/service/serviceempleado.service';
import { ServicereservaService } from 'src/app/service/servicereserva.service';

@Component({
  selector: 'app-eliminareserva',
  templateUrl: './eliminareserva.component.html',
  styleUrls: ['./eliminareserva.component.css']
})
export class EliminareservaComponent implements OnInit {

  mensaje: string ="";
  id: number = 0;

  constructor(private route: ActivatedRoute, private zone:NgZone, private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarReserva();
    this.irReservas();

  }

  async irReservas(): Promise<boolean>{
    return this.router.navigateByUrl('reserva');
  }


  async eliminarReserva(): Promise<void>{
    await this.servicioReserva.deleteReserva(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }
}