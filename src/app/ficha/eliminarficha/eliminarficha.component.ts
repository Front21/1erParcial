import { Component, NgZone, OnInit } from '@angular/core';
import { Ficha } from 'src/app/model/ficha';
import { ServicefichaService } from 'src/app/service/serviceficha.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-eliminarficha',
  templateUrl: './eliminarficha.component.html',
  styleUrls: ['./eliminarficha.component.css']
})
export class EliminarfichaComponent implements OnInit {
  fichas : Ficha[] = []; 
  mensaje: string ="";
  id: number = 0;
  constructor(private route: ActivatedRoute, private servicioFicha: ServicefichaService, private router: Router,private zone:NgZone) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    this.eliminarFicha();
    //this.router.navigate( [routerLink]="['/ficha']");
    //this.ngZone.run(() => this.router.navigateByUrl('/ficha'))
    this.zone.run(() => {
      this.router.navigate(['/ficha'] );
    });

  }

  eliminarFicha(): void{
    this.servicioFicha.deleteFicha(this.id).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}
