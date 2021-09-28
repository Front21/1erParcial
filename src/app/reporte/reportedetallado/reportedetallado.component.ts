import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Servicio} from "../../model/servicio";
import {Categoria} from "../../model/categoria";
import {SubCategoria} from "../../model/subcategoria";
import {Persona} from "../../model/persona";
import {Ficha} from "../../model/ficha";
import {Detalle} from "../../model/detalle";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {ServiceCategoriaService} from "../../service/servicecategoria.service";
import {ServicesubcategoriaService} from "../../service/servicesubcategoria.service";
import {ServiceempleadoService} from "../../service/serviceempleado.service";
import {ServiceclienteService} from "../../service/servicecliente.service";
import {Router} from "@angular/router";
import { PresentacionProducto } from 'src/app/model/presentacionproducto';
import {PresentacionproductoService} from "../../service/presentacionproducto.service";
import { jsPDF } from  "jspdf"

@Component({
  selector: 'app-reportedetallado',
  templateUrl: './reportedetallado.component.html',
  styleUrls: ['./reportedetallado.component.css']
})
export class ReportedetalladoComponent implements OnInit {

  servicios: Detalle[] = [];
  serviciosResultado: Detalle[]=[];
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] =[];
  subCategoriaSelec: SubCategoria = new SubCategoria();
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
  clickBuscar: boolean = false;
  chechFechaDesde: boolean = false;
  chechFechaHasta: boolean = false;
  presentaciones: PresentacionProducto[] = []
  presentacionSelec: PresentacionProducto = new PresentacionProducto();
  mensaje: string = "";

  constructor(private servicioServicio: ServiceservicioService,
              private servicioCategoria: ServiceCategoriaService,
              private serviciosubcategoria: ServicesubcategoriaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService,
              private servicioPresentacion: PresentacionproductoService,
              private router: Router) { }

  ngOnInit(): void {

    //Lista detallada sin filtrar
    this.servicioServicio.getServiciosDetallados().subscribe(
      entity => this.servicios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

    //Datos para los selectores
    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioCliente.getClientes().subscribe(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Clientes')
    );

    this.servicioCategoria.getCategorias().subscribe(
      entity => {this.categorias = entity.lista},
      error => console.log('No se pudo acceder al servicio')
    );
  }

  async buscar(): Promise<void>{

    this.clickBuscar = true;

    let filtro;
    //Todos se marcan
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
    this.presentacionSelec.idPresentacionProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
          idServicio: {
            idFichaClinica:{
              idCliente:{
                idPersona:this.clienteSelec.idPersona
            }
          },
            idEmpleado:{
              idPersona:this.empleadoSelec.idPersona
            },
            fechaDesdeCadena:this.fechacadenad,
            fechaHastaCadena:this.fechacadenaf
          },
          idPresentacionProducto: {
            idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
          }
      }
    }

    //No se marca empleado
    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        },
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
        this.anod= this.fechadesde.toString().substr(0,4);
        this.mesd= this.fechadesde.toString().substr(5,2);
        this.diad= this.fechadesde.toString().substr(8,2);
        this.fechacadenad= this.anod+this.mesd+this.diad;
        this.anof= this.fechahasta.toString().substr(0,4);
        this.mesf= this.fechahasta.toString().substr(5,2);
        this.diaf= this.fechahasta.toString().substr(8,2);
        this.fechacadenaf= this.anof+this.mesf+this.diaf;
        filtro = {
          idServicio: {
            fechaDesdeCadena:this.fechacadenad,
            fechaHastaCadena:this.fechacadenaf
          },
          idPresentacionProducto: {
            idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
          }
        }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
      filtro = {
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }

    //No se marca cleinte
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idServicio: {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        },
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
      filtro = {
        idServicio: {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          }
        },
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      filtro = {
        idServicio: {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          }
        }
      }
    }

    //No se marca fecha
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){

      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          }
        },
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          }
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto != undefined){
      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          }
        },
        idPresentacionProducto: {
          idPresentacionProducto:this.presentacionSelec.idPresentacionProducto
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          }
        }
      }
    }

    //No se marca presentacion
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idServicio: {
          idFichaClinica:{
            idCliente:{
              idPersona:this.clienteSelec.idPersona
            }
          },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
        this.anod= this.fechadesde.toString().substr(0,4);
        this.mesd= this.fechadesde.toString().substr(5,2);
        this.diad= this.fechadesde.toString().substr(8,2);
        this.fechacadenad= this.anod+this.mesd+this.diad;
        this.anof= this.fechahasta.toString().substr(0,4);
        this.mesf= this.fechahasta.toString().substr(5,2);
        this.diaf= this.fechahasta.toString().substr(8,2);
        this.fechacadenaf= this.anof+this.mesf+this.diaf;
        filtro = {
          idServicio: {
            idFichaClinica:{
              idCliente:{
                idPersona:this.clienteSelec.idPersona
              }
            },
            fechaDesdeCadena:this.fechacadenad,
            fechaHastaCadena:this.fechacadenaf
          }
        }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idServicio: {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      filtro = {
        idServicio: {
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        }
      }
    }

    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
      this.presentacionSelec.idPresentacionProducto == undefined){
      this.mensaje = "Es necesario marcar opciones de filtro";
    }else{
      await this.servicioServicio.getServicioDetalladoEspecifico(filtro).then(
        entity => this.serviciosResultado = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Clientes')
      );
    }

  }

  onChangeCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    //this.mensaje = nuevoSelect.idCategoria;
    this.serviciosubcategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  onChangeSubCategoria(nuevoSelect: SubCategoria): void{
    this.presentaciones = [];
    this.servicioPresentacion.getPresentacionProductoSubCategoria(nuevoSelect.idTipoProducto).then(
      entity => this.presentaciones = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Presentacion Producto')
    );
  }

  @ViewChild('content', {static: false}) el!: ElementRef;
  makePDF(){
    let pdf = new jsPDF('p','pt','a1');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save("reporte.pdf");
      }
    });
  }
  

}