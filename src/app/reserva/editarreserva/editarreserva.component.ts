import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
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
  cancelado: string="";
  asistio: string="";
  asistioSelec: string="";
  mensaje: string="";
  
  constructor( private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService) { }

  ngOnInit(): void {

  }



  
}
