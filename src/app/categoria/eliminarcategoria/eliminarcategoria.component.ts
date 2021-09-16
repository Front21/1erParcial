import { Component, OnInit } from '@angular/core';
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
  idCat: number=0;
  elicategoriaSelec: Categoria = new Categoria();
  constructor(private servicioCategoria: ServiceCategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService) { }

  ngOnInit(): void {

    this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

  }

  eliminarCategoria(): void{
    this.servicioCategoria.deleteCategoria(this.elicategoriaSelec.idCategoria).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }

}
