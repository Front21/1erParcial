import { Component, OnInit, SimpleChanges, ɵɵqueryRefresh } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Ficha } from '../model/ficha';
import { ServiceCategoriaService } from '../service/servicecategoria.service';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ServicefichaService } from '../service/serviceficha.service';
import { SubCategoria } from '../model/subcategoria';
import { Persona } from '../model/persona';
import { ServiceclienteService } from '../service/servicecliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ServiceservicioService} from "../service/serviceservicio.service";
import {Servicio} from "../model/servicio";
import {Sort} from "@angular/material/sort";


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  servicios: Servicio[] = [];
  serviciosResultado: Servicio[]=[];
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  subcategoriaSelec: SubCategoria= new SubCategoria();
  ServicioFiltroSubcategoria: Servicio[] =[];
  empleados: Persona [] = [];
  empleadoSelec: Persona = new Persona();
  ServicioFiltroEmpleado: Servicio[] = [];
  clientes: Persona [] = [];
  clienteSelec: Persona = new Persona();
  ServicioFiltroCliente: Servicio[] = [];
  fechadesde: any;
  fechahasta: any;
  diad : string="";
  mesd: string="";
  anod: string="";
  fechacadenad: string="";
  diaf : string="";
  mesf: string="";
  anof: string="";
  fechacadenaf: string="";
  ServicioFiltroFecha: Servicio[] = [];
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  FichaFiltroCategoria: Ficha[] = [];
  descripcionSelec: string = "";
  //id: number=0;
  mensaje: string = "";
  clickBuscar: boolean = false;
  chechFechaDesde: boolean = false;
  chechFechaHasta: boolean = false;


  constructor(private servicioServicio: ServiceservicioService,
              private servicioCategoria: ServiceCategoriaService,
              private serviciosubcategoria: ServicesubcategoriaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService,
              private router: Router) { }

  ngOnInit(): void {
    let ejemplo2={
      soloUsuariosDelSistema: true
    }

    //Lista sin filtrar
    this.servicioServicio.getServiciosP({
      orderBy: "idServicio",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.servicios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

    this.servicioCategoria.getCategoriasP({
      orderBy: "descripcion",
      orderDir: "asc",
      like: "S",
    }).subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

    this.serviciosubcategoria.getSubCategoriasP({
      orderBy: "descripcion",
      orderDir: "asc",
      like: "S",
    }).subscribe(
      entity => this.subcategorias= entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );

    this.servicioEmpleado.getEmpleadosP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
      ejemplo : JSON.stringify(ejemplo2)
    }).then(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioCliente.getClientesP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Clientes')
    );
  }

  onChangeCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    this.serviciosubcategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  async buscarServicio(active: string, direction: string, desdeSort: boolean): Promise<void>{

    if(!desdeSort){
      this.clickBuscar = true;
    }

    let params;
    let filtro;

    //Todos se marcan
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica:{
          idCliente: {
            idPersona : this.clienteSelec.idPersona
          },
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
      }
    }


    //No se marca empleado
    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica:{
          idCliente: {
            idPersona : this.clienteSelec.idPersona
          },
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
      }

    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica:{
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
        idFichaClinica:{
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        }
      }
    }

    //No se marca cleinte
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica:{
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
        idFichaClinica:{
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      filtro = {
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        }
      }
    }

    //No se marca fecha
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){

      filtro = {
        idFichaClinica:{
          idCliente: {
            idPersona : this.clienteSelec.idPersona
          },
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      filtro = {
        idFichaClinica:{
          idCliente: {
            idPersona : this.clienteSelec.idPersona
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        }
      }

    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
        idFichaClinica:{
          idCliente: {
            idPersona : this.clienteSelec.idPersona
          },
          idTipoProducto: {
            idTipoProducto: this.subcategoriaSelec.idTipoProducto
          }
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined) {
      filtro = {
        idFichaClinica: {
          idCliente: {
            idPersona: this.clienteSelec.idPersona
          }
        }
      }
    }

    //No se marca presentacion
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica: {
          idCliente: {
            idPersona: this.clienteSelec.idPersona
          }
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf

      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idFichaClinica: {
          idCliente: {
            idPersona: this.clienteSelec.idPersona
          }
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf
      }
    }

    console.log(this.empleadoSelec.idPersona);
    console.log(this.clienteSelec.idPersona);
    console.log(this.fechadesde);
    console.log(this.fechahasta);
    console.log(this.subcategoriaSelec.idTipoProducto);
    console.log(this.clickBuscar);
    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined && this.clickBuscar == true){
      this.mensaje = "Es necesario marcar opciones de filtro";
    }else{
      if(this.clickBuscar){
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
          ejemplo: JSON.stringify(filtro)
        }
      }else{
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
        }
      }

      console.log(params);
      await this.servicioServicio.getServiciosP(params).then(
        entity => {this.servicios = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    }
  }


  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscarServicio(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = false;
    await this.servicioServicio.getServiciosP({
      orderBy: "idServicio",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.servicios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }

}
