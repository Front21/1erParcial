import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { Persona } from '../model/persona';
import { SubCategoria } from '../model/subcategoria';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';
import {Sort} from '@angular/material/sort';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = new Categoria();
  mensaje: string = "";
  descripcionSelec: string = "";
  idCategoriaSelec: number = 0;
  fichas: Ficha[] = [];
  fichasResultado: Ficha[]=[];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  subcategoriaSelec: SubCategoria= new SubCategoria();
  FichaFiltroCategoria: Ficha[] = [];
  FichaFiltroSubcategoria: Ficha[] =[];
  empleados: Persona [] = [];
  empleadoSelec: Persona = new Persona();
  FichaFiltroEmpleado: Ficha[] = [];
  clientes: Persona [] = [];
  clienteSelec: Persona = new Persona();
  FichaFiltroCliente: Ficha[] = [];
  fechadesde: Date = new Date();
  fechahasta: Date = new Date();
  diad : string="";
  mesd: string="";
  anod: string="";
  fechacadenad: string="";
  diaf : string="";
  mesf: string="";
  anof: string="";
  fechacadenaf: string="";
  FichaFiltroFecha: Ficha[] = [];
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  public page: number = 1;
  constructor(private servicioCategoria: ServiceCategoriaService,
    private serviciosubcategoria: ServicesubcategoriaService,
    ) { }

  ngOnInit(): void {
    const param = {
      orderBy: "idCategoria",
      orderDir: "asc",
      like: "S"
    }
    this.servicioCategoria.getCategoriasP(param).subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

  }
  sortData(sort: Sort): void {
    console.log(sort.active);
    console.log(sort.direction);
    const param = {
      orderBy: sort.active,
      orderDir: sort.direction,
      like: "S"
    }
    this.servicioCategoria.getCategoriasP(param).subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }

}

