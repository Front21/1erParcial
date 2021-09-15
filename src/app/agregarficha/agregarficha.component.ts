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
  selector: 'app-agregarficha',
  templateUrl: './agregarficha.component.html',
  styleUrls: ['./agregarficha.component.css']
})
export class AgregarfichaComponent implements OnInit {

  fichas: Ficha[] = [];
  fichasResultado: Ficha[]=[];
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  nuevaficha: Ficha = new Ficha();
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
  motivo : string="";
  diagnostico: string="";
  observacion: string="";
  fechacadenad: string="";
  diaf : string="";
  mesf: string="";
  mensaje: string="";
  fechacadenaf: string="";
  FichaFiltroFecha: Ficha[] = [];
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;

  constructor(private servicioFicha: ServicefichaService, 
    private servicioCategoria: ServiceCategoriaService, 
    private serviciosubcategoria: ServicesubcategoriaService,
    private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService  ) { }


  ngOnInit(): void {
  
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
        error =>console.log('No se pudo acceder a la lista de Empleados')
      );
  
      this.servicioCliente.getClientes().subscribe(
        entity => this.clientes = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Clientes')
      );
  
  }

  crearFicha(): void{

    this.nuevaficha.idCliente = this.clienteSelec;
    this.nuevaficha.idEmpleado = this.empleadoSelec;
    this.nuevaficha.idTipoProducto = this.subcategoriaSelec;
    this.nuevaficha.motivoConsulta = this.motivo;
    this.nuevaficha.diagnostico = this.diagnostico;
    this.nuevaficha.observacion = this.observacion;

    this.servicioFicha.postFicha({
      motivoConsulta: this.nuevaficha.motivoConsulta,
      diagnostico: this.nuevaficha.diagnostico,
      observacion: this.nuevaficha.observacion,
      idEmpleado:{
      idPersona: this.nuevaficha.idEmpleado.idPersona
      },
        idCliente:{
        idPersona: this.nuevaficha.idCliente.idPersona
        },
          idTipoProducto: 
          this.nuevaficha.idTipoProducto}).subscribe(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

  }

}
