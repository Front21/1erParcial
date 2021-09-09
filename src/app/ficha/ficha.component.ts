import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ServicefichaService } from '../service/serviceficha.service';
import { SubCategoria } from '../model/subcategoria';
import { Persona } from '../model/persona';
import { ServiceclienteService } from '../service/servicecliente.service';


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  fichas: Ficha[] = [];
  categorias: Categoria[] = [];
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
  dia : number=0;
  mes: number=0;
  ano: number=0;
  fechacadena: string="";
  


  constructor(private servicioFicha: ServicefichaService, 
    private servicioCategoria: ServiceCategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService,
    private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService  ) { }

  ngOnInit(): void {
    this.servicioFicha.getFichas().subscribe(
      entity => this.fichas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

     this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    ); 
    
    this.serviciosubcategoria.getSubCategorias().subscribe(
      entity => this.subcategorias= entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

    this.servicioCliente.getClientes().subscribe(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );
  }

  buscar(): void{
    this.servicioFicha.getFichasCategoria(this.categoriaSelec.idCategoria).subscribe(
      entity => this.FichaFiltroCategoria = entity.lista,
      error =>console.log('1no se pudieron conseguir los paises'), 
    );

    this.servicioFicha.getFichasEmpleados(this.empleadoSelec.idPersona).subscribe(
      entity => this.FichaFiltroEmpleado = entity.lista,
      error =>console.log('1no se pudieron conseguir los paises'), 
    );
    
    this.servicioFicha.getFichasClientes(this.clienteSelec.idPersona).subscribe(
      entity => this.FichaFiltroCliente = entity.lista,
      error =>console.log('1no se pudieron conseguir los paises'), 
    );

  }
  
  probarfecha(): void{
    console.log(this.fechadesde);
    this.dia = this.fechadesde.getDate();
    this.mes = this.fechadesde.getMonth();
    this.ano = this.fechadesde.getFullYear();

    this.fechacadena=this.ano.toString()+this.mes.toString()+this.dia.toString();
    console.log(this.fechacadena);
  };


}
