import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { Persona } from '../model/persona';
import { SubCategoria } from '../model/subcategoria';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';


@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  subcategorias: SubCategoria[] = [];
  nuevaSubcategoria: SubCategoria = new SubCategoria();
  mensaje: string = "";
  idCategoriaSelec: number = 0;
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  descripcionSelec: string = "";
  constructor(private servicioSubCategoria: ServicesubcategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService,
    ) { }

  ngOnInit(): void {
    this.servicioSubCategoria.getSubCategorias().subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );

  }


}

