import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategoria } from 'src/app/model/subcategoria';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-editarsubcategoria',
  templateUrl: './editarsubcategoria.component.html',
  styleUrls: ['./editarsubcategoria.component.css']
})
export class EditarsubcategoriaComponent implements OnInit {

  descripcionSelec:  string = "";
  id: number=0;
  subcategoria: SubCategoria = new SubCategoria();
  mensaje: string = "";

  constructor(private route: ActivatedRoute,
    private servicioSubcategoria: ServicesubcategoriaService) { }

  ngOnInit(): void {

      
  this.route.queryParams.subscribe(params => {this.id = params['id'];});
  this.servicioSubcategoria.getSubcategoria(this.id).subscribe(
    entity => {this.subcategoria.idTipoProducto = entity.idTipoProducto, this.subcategoria.idCategoria= entity.idCategoria,
     this.subcategoria.descripcion = entity.descripcion},
    error => console.log('No se pudo acceder a la Categoria')
  );

  }

  editarSubcategoria(): void{

      console.log(this.subcategoria.idCategoria.idCategoria);
      console.log(this.subcategoria.descripcion);
       this.servicioSubcategoria.putSubcategoria({idTipoProducto: this.subcategoria.idTipoProducto,idCategoria:{idCategoria: this.subcategoria.idCategoria.idCategoria},descripcion:this.subcategoria.descripcion}).subscribe(
         () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));
   
     }
  



}
