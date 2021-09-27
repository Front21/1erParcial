import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { Persona } from '../model/persona';
import { SubCategoria } from '../model/subcategoria';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';
import {Router} from "@angular/router";
import {Sort} from "@angular/material/sort";


@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  subcategorias: SubCategoria[] = [];
  subcategoriasResultado: SubCategoria[] = [];
  nuevaSubcategoria: SubCategoria = new SubCategoria();
  mensaje: string = "";
  idCategoriaSelec: number = 0;
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  descripcionSelec: string = "";
  public page: number =1;
  clickBuscar: boolean = false;
  categoriaSelec: Categoria = new Categoria();
  categorias: Categoria[] = [];

  constructor(private servicioSubCategoria: ServicesubcategoriaService,
    private servicioCategoria: ServiceCategoriaService,
              private router: Router
    ) { }

  ngOnInit(): void {
    const param = {
      orderBy: "idTipoProducto",
      orderDir: "asc",
      like: "S"
    }
    this.servicioSubCategoria.getSubCategoriasP(param).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );

    this.servicioCategoria.getCategoriasP({
      orderBy: "idCategoria",
      orderDir: "asc",
      like: "S"
    }).subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );

  }

  async buscar(): Promise<void>{
    this.clickBuscar = true;
    if(this.categoriaSelec.idCategoria != undefined){
      const filtro = {
        idCategoria: {
          idCategoria : this.categoriaSelec.idCategoria
        }
      }
      const param = {
        orderBy: "idTipoProducto",
        orderDir: "asc",
        like: "S",
        ejemplo: JSON.stringify(filtro)
      }
      await this.servicioSubCategoria.getSubcategoriasCategoriaP(param).then(
        entity => this.subcategorias = entity.lista,
        error =>console.log('No se pudo acceder a la lista de SubCategorias')
      );
    }
    await this.irListadoSubCategorias();

  }

  async irListadoSubCategorias(): Promise<boolean>{
    return this.router.navigateByUrl('subcategoria');
  }

  async limpiar(): Promise<void>{
    this.clickBuscar = false;
    const param = {
      orderBy: "idTipoProducto",
      orderDir: "asc",
      like: "S"
    }
    this.servicioSubCategoria.getSubCategoriasP(param).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    let param;
    if(this.clickBuscar){
      const filtro = {
        idCategoria: {
          idCategoria : this.categoriaSelec.idCategoria
        }
      }
      param = {
        orderBy: sort.active,
        orderDir: sort.direction,
        like: "S",
        ejemplo: JSON.stringify(filtro)
      }
    }else{
      param = {
        orderBy: sort.active,
        orderDir: sort.direction,
        like: "S",
      }
    }
    await this.servicioSubCategoria.getSubcategoriasCategoriaP(param).then(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }



}

