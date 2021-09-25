import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-eliminarsubcategoria',
  templateUrl: './eliminarsubcategoria.component.html',
  styleUrls: ['./eliminarsubcategoria.component.css']
})
export class EliminarsubcategoriaComponent implements OnInit {

  mensaje: string ="";
  id: number = 0;
  constructor(private route: ActivatedRoute, private servicioSubcategoria: ServicesubcategoriaService, private router: Router,private zone:NgZone) { }

  async ngOnInit(): Promise<void>  {

    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarSubcategoria();
    this.irSubcategoria();
  }

  async irSubcategoria(): Promise<boolean>{
    return this.router.navigateByUrl('subcategoria');
  }


  async eliminarSubcategoria(): Promise<void>{
    await this.servicioSubcategoria.deleteSubcategoria(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }


}