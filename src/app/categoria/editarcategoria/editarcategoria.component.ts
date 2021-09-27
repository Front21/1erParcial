import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { ServiceCategoriaService } from 'src/app/service/servicecategoria.service';

@Component({
  selector: 'app-editarcategoria',
  templateUrl: './editarcategoria.component.html',
  styleUrls: ['./editarcategoria.component.css']
})
export class EditarcategoriaComponent implements OnInit {
  descripcionSelec:  string = "";
  id: number=0;
  categoria: Categoria = new Categoria();
  mensaje: string = "";
  constructor(private route: ActivatedRoute, private servicioCategoria: ServiceCategoriaService,
              private router: Router) { }

  ngOnInit(): void {


  this.route.queryParams.subscribe(params => {this.id = params['id'];});
  this.servicioCategoria.getCategoria(this.id).subscribe(
    entity => {this.categoria.idCategoria = entity.idCategoria,
     this.categoria.descripcion = entity.descripcion},
    error => console.log('No se pudo acceder a la Categoria')
  );

  }
  async editarCategoria(): Promise<void>{
    console.log(this.categoria.idCategoria );
    console.log(this.categoria.descripcion);
     await this.servicioCategoria.putCategoria({idCategoria:this.categoria.idCategoria,descripcion:this.categoria.descripcion}).then(
       () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));

     await this.irListadoCategorias();

   }

   async irListadoCategorias(): Promise<boolean>{
    return this.router.navigateByUrl('categoria');
   }



}
