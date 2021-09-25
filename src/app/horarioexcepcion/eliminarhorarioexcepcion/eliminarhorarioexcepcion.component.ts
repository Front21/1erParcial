import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicehorarioexcepcionService } from 'src/app/service/servicehorarioexcepcion.service';

@Component({
  selector: 'app-eliminarhorarioexcepcion',
  templateUrl: './eliminarhorarioexcepcion.component.html',
  styleUrls: ['./eliminarhorarioexcepcion.component.css']
})
export class EliminarhorarioexcepcionComponent implements OnInit {

  mensaje: string ="";
  id: number = 0;

  constructor(private route: ActivatedRoute, private servicioHorarioexcepcion: ServicehorarioexcepcionService, private router: Router,private zone:NgZone) { }

  async ngOnInit(): Promise<void> {

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarHorarioExcepcion();
    this.irhorarioExcepcion();


  }

  async irhorarioExcepcion(): Promise<boolean>{
    return this.router.navigateByUrl('horarioexcepcion');
  }


  async eliminarHorarioExcepcion(): Promise<void>{
    await this.servicioHorarioexcepcion.deleteHorarioexcepcion(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }
}
