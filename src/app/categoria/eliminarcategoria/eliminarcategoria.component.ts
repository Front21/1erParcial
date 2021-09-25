import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Ficha } from 'src/app/model/ficha';
import { Persona } from 'src/app/model/persona';
import { SubCategoria } from 'src/app/model/subcategoria';
import { ServiceCategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-eliminarcategoria',
  templateUrl: './eliminarcategoria.component.html',
  styleUrls: ['./eliminarcategoria.component.css']
})
export class EliminarcategoriaComponent implements OnInit {
  mensaje: string = "";
  id: number = 0;
  constructor(private servicioCategoria: ServiceCategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService,
    private route: ActivatedRoute,
    private router: Router,private zone:NgZone) { }


  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarCategoria();
    this.irListadoCategoria();
  }

  async irListadoCategoria(): Promise<boolean>{
    return this.router.navigateByUrl('categoria');
  }


  async eliminarCategoria(): Promise<void>{
    await this.servicioCategoria.deleteCategoria(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}


