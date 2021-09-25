import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Ficha } from 'src/app/model/ficha';
import { Persona } from 'src/app/model/persona';
import { SubCategoria } from 'src/app/model/subcategoria';
import { ServiceCategoriaService } from 'src/app/service/servicecategoria.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-agregarcategoria',
  templateUrl: './agregarcategoria.component.html',
  styleUrls: ['./agregarcategoria.component.css']
})
export class AgregarcategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = new Categoria();
  mensaje: string = "";
  descripcionSelec: string = "";

  constructor(private servicioCategoria: ServiceCategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService,
    private router: Router ) { }

  ngOnInit(): void {
    this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

  }

  async crearCategoria():  Promise<void>{
    
    this.nuevaCategoria.descripcion = this.descripcionSelec;
  
    await this.servicioCategoria.postCategorias({descripcion: this.nuevaCategoria.descripcion}).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

  await this.ircategorias();
  }

  async ircategorias(): Promise<boolean>{
    return this.router.navigateByUrl('categoria');
  }
}
