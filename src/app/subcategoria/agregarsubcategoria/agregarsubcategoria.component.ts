import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/categoria';
import { Ficha } from 'src/app/model/ficha';
import { Persona } from 'src/app/model/persona';
import { SubCategoria } from 'src/app/model/subcategoria';
import { ServiceCategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';


@Component({
  selector: 'app-agregarsubcategoria',
  templateUrl: './agregarsubcategoria.component.html',
  styleUrls: ['./agregarsubcategoria.component.css']
})
export class AgregarsubcategoriaComponent implements OnInit {
  subcategorias: SubCategoria[] = [];
  categorias: Categoria[] = [];
  nuevaSubCategoria: SubCategoria = new SubCategoria();
  mensaje: string = "";
  descripcionSelec: string = "";
  idCategoriaSelec: number =0;

  constructor(private servicioCategoria: ServiceCategoriaService,private serviciosubcategoria: ServicesubcategoriaService) { }
 

  ngOnInit(): void {
    this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias= entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
    
  }

  crearSubCategoria(): void{
    this.nuevaSubCategoria.idCategoria.idCategoria = this.idCategoriaSelec;
    this.nuevaSubCategoria.descripcion = this.descripcionSelec;
  
    this.serviciosubcategoria.postSubcategorias({idCategoria: this.nuevaSubCategoria.idCategoria.idCategoria, descripcion:  this.nuevaSubCategoria.descripcion}).subscribe(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

  }
}
