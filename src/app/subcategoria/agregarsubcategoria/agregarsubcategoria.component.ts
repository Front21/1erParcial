import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  CategoriaSelec: Categoria = new Categoria();

  constructor(private servicioCategoria: ServiceCategoriaService,private serviciosubcategoria: ServicesubcategoriaService,private router: Router) { }


  ngOnInit(): void {
    this.servicioCategoria.getCategoriasP({
      orderBy: "descripcion",
      orderDir: "asc",
      like: "S"
    }).subscribe(
      entity => this.categorias= entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
    this.serviciosubcategoria.getSubCategorias().subscribe(
      entity => this.subcategorias= entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

  }

  async crearSubCategoria(): Promise<void>{

    this.nuevaSubCategoria.idCategoria = this.CategoriaSelec;
    this.nuevaSubCategoria.descripcion = this.descripcionSelec;

    await this.serviciosubcategoria.postSubcategorias({idCategoria: this.nuevaSubCategoria.idCategoria, descripcion:  this.nuevaSubCategoria.descripcion}).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irsubcategorias();
  }


  async irsubcategorias(): Promise<boolean>{
    return this.router.navigateByUrl('subcategoria');
  }

}
