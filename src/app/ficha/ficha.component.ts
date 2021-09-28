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
import {Sort} from "@angular/material/sort";


@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {
  fichas: Ficha[] = [];
  fichasResultado: Ficha[]=[];
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  subcategoriaSelec: SubCategoria= new SubCategoria();
  FichaFiltroSubcategoria: Ficha[] =[];
  empleados: Persona [] = [];
  empleadoSelec: Persona = new Persona();
  FichaFiltroEmpleado: Ficha[] = [];
  clientes: Persona [] = [];
  clienteSelec: Persona = new Persona();
  FichaFiltroCliente: Ficha[] = [];
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
  FichaFiltroFecha: Ficha[] = [];
  band: boolean=false;
  band2: boolean=false;
  cont: number=0;
  FichaFiltroCategoria: Ficha[] = [];
  descripcionSelec: string = "";
  //id: number=0;
  mensaje: string="";
  clickBuscar: boolean = false;


  constructor(private servicioFicha: ServicefichaService,
              private servicioCategoria: ServiceCategoriaService,
              private serviciosubcategoria: ServicesubcategoriaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService) { }

  ngOnInit(): void {

    let ejemplo2={
      soloUsuariosDelSistema: true
    }
    this.servicioFicha.getFichasP({
      orderBy: "idFichaClinica",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.fichas = entity.lista,
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

  async buscarFicha(active: string, direction: string, desdeSort: boolean): Promise<void>{

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
        idCliente:{
          idPersona:this.clienteSelec.idPersona
        },
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
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
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf,
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
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
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf,
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
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
        idEmpleado:{
          idPersona:this.empleadoSelec.idPersona
        },
        fechaDesdeCadena:this.fechacadenad,
        fechaHastaCadena:this.fechacadenaf,
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
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
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      filtro = {
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          }
      }

    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto != undefined){
      filtro = {
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
        idTipoProducto: {
          idTipoProducto:this.subcategoriaSelec.idTipoProducto
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.subcategoriaSelec.idTipoProducto == undefined){
      filtro = {
            idCliente:{
              idPersona:this.clienteSelec.idPersona
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
            idCliente:{
              idPersona:this.clienteSelec.idPersona
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
            idCliente:{
              idPersona:this.clienteSelec.idPersona
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
      await this.servicioFicha.getFichasP(params).then(
        entity => {this.fichas = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    }
  }


  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscarFicha(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = false;
    await this.servicioFicha.getFichasP({
      orderBy: "idFichaClinica",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.fichas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }

  eliminarFicha(id: number): void{
    console.log('el id es '+id);
    this.servicioFicha.deleteFicha(id).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
    this.refresh();
  }

  refresh(): void { window.location.reload(); }

  onChangeCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    //this.mensaje = nuevoSelect.idCategoria;
    this.serviciosubcategoria.getSubCategoriasP({
      orderBy: "descripcion",
      orderDir: "asc",
      like: "S"
    }).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }



}
