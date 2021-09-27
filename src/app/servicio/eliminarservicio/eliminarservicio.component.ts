import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServicereservaService} from "../../service/servicereserva.service";
import {ServiceempleadoService} from "../../service/serviceempleado.service";
import {ServiceclienteService} from "../../service/servicecliente.service";
import {ServiceservicioService} from "../../service/serviceservicio.service";

@Component({
  selector: 'app-eliminarservicio',
  templateUrl: './eliminarservicio.component.html',
  styleUrls: ['./eliminarservicio.component.css']
})
export class EliminarservicioComponent implements OnInit {
  mensaje: string ="";
  id: number = 0;

  constructor(private route: ActivatedRoute, private zone:NgZone, private servicioServicio : ServiceservicioService, private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService, private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarServicio();
    this.irListaServicios();

  }

  async irListaServicios(): Promise<boolean>{
    return this.router.navigateByUrl('servicio');
  }


  async eliminarServicio(): Promise<void>{
    await this.servicioServicio.deleteServicio(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}
