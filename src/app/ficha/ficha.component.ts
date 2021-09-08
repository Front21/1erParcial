import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicefichaService } from '../service/serviceficha.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  fichas: Ficha[] = [];
  categorias: Categoria[] = [];
  categoriaSelec: Categoria = new Categoria();
  FichaFiltroCategoria: Ficha[] = [];



  constructor(private servicioFicha: ServicefichaService, private servicioCategoria: ServiceCategoriaService ) { }

  ngOnInit(): void {
    this.servicioFicha.getFichas().subscribe(
      entity => this.fichas = entity.lista,
      error =>console.log('no se pudieron conseguir los paises')
    );

     this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('no se pudieron conseguir los paises')
    );  
  }

  buscar(): void{
    this.servicioFicha.getFichasCategoria(this.categoriaSelec.toString()).subscribe(
      entity => this.FichaFiltroCategoria = entity.lista,
      error =>console.log('no se pudieron conseguir los paises')
    );
  }

}
