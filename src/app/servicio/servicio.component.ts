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
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';


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
  mensaje: number=0;
  clickBuscar: boolean = false;
  chechFechaDesde: boolean = false;
  chechFechaHasta: boolean = false;
  idE: number = 0;
  flagpopup: string = "";
  data: any;

  constructor(private servicioServicio: ServiceservicioService,
              private servicioCategoria: ServiceCategoriaService,
              private serviciosubcategoria: ServicesubcategoriaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService,
              private router: Router,private route: ActivatedRoute,public dialog: MatDialog,) { }

  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {this.flagpopup = params['flagpopup'];});
    this.route.queryParams.subscribe(params => {this.idE = params['idE'];});
    console.log(this.flagpopup);
    console.log(this.idE);


    //Lista sin filtrar
    this.servicioServicio.getServicios().subscribe(
      entity => this.servicios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );

    //Datos para los selectores
    this.servicioCategoria.getCategorias().subscribe(
      entity => this.categorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
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

  onChangeCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    this.mensaje = nuevoSelect.idCategoria;
    this.serviciosubcategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  async buscar(): Promise<void>{

    this.route.queryParams.subscribe(params => {this.flagpopup = params['flagpopup'];});
    this.route.queryParams.subscribe(params => {this.idE = params['idE'];});
    console.log(this.flagpopup);
    console.log(this.idE);

    this.clickBuscar = true;

    if(this.empleadoSelec.idPersona != undefined){
      await this.servicioServicio.getServiciosEmpleados(this.empleadoSelec.idPersona).then(
        entity => this.ServicioFiltroEmpleado = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
      );
    }

    console.log('LENGTH EMPLEADO: '+this.ServicioFiltroEmpleado.length);

    console.log('ID DE CATEGORIA QUE LLEGA COMPONENTE: '+this.subcategoriaSelec.idTipoProducto);

    if(this.subcategoriaSelec.idTipoProducto != undefined) {
      await this.servicioServicio.getServiciosSubCategoria(this.subcategoriaSelec.idTipoProducto).then(
        entity => this.ServicioFiltroSubcategoria = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Categorias'),
      );
    }

    console.log('LENGTH SUBCATE: '+this.ServicioFiltroSubcategoria.length);

    if(this.clienteSelec.idPersona != undefined) {
      await this.servicioServicio.getServiciosCliente(this.clienteSelec.idPersona).then(
        entity => this.ServicioFiltroCliente = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Fechas'),
      );
    }

    console.log('LENGTH CLIENTE: '+this.ServicioFiltroCliente.length);

    console.log('FECHA CADENA: '+this.fechadesde);

    //Verificar si se amrco algo en el selector
    if(this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;

      await this.servicioServicio.getServiciosFechas(this.fechacadenad,this.fechacadenaf).then(
        entity => this.ServicioFiltroFecha = entity.lista,
        error =>console.log('1no se pudieron conseguir los paises'),
      );
    }


    console.log('LENGTH FECHA: '+this.ServicioFiltroFecha.length);

    this.serviciosResultado=[];
    this.actualizarResultadoFiltro();
    console.log('LENGTH RESULTADO: '+this.serviciosResultado.length);


  }

  actualizarResultadoFiltro(): void {
    for (var servicio in this.servicios) {
      this.band2 = false; //criterio: asegura que todas las listas no hayan sido vacias por no seleccionar nada
      if(this.ServicioFiltroSubcategoria.length>0){
        this.band2=true;
        this.band=false; //criterio si no se encuentra en una lista cargada, se debe rechazar
          for (var s1 in this.ServicioFiltroSubcategoria){
            if(this.servicios[servicio].idServicio==this.ServicioFiltroSubcategoria[s1].idServicio){
              this.band=true;
              break;
            }
          }
          if(this.band==false){
            continue;
          }
          //this.band = false;
      }else{
        if(this.subcategoriaSelec.idTipoProducto != 0 && this.subcategoriaSelec.idTipoProducto != undefined){
          continue;
        }
      }

      if(this.ServicioFiltroEmpleado.length>0){
        console.log("ENTRO A EMPLEADO");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ServicioFiltroEmpleado){
          if(this.servicios[servicio].idServicio==this.ServicioFiltroEmpleado[s1].idServicio){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          continue;
        }
        //this.band = false;
      }else{
        if(this.empleadoSelec.idPersona != 0 && this.empleadoSelec.idPersona != undefined){
          continue;
        }
      }

      if(this.ServicioFiltroCliente.length>0){
        console.log("ENTRO A CLIENTE");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ServicioFiltroCliente){
          if(this.servicios[servicio].idServicio==this.ServicioFiltroCliente[s1].idServicio){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          continue;
        }
        //this.band = false;
      }else{
        if(this.clienteSelec.idPersona != 0 && this.clienteSelec.idPersona != undefined){
          continue;
        }
      }

      if(this.ServicioFiltroFecha.length>0){
        console.log("ENTRO A FECHA");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ServicioFiltroFecha){
          if(this.servicios[servicio].idServicio==this.ServicioFiltroFecha[s1].idServicio){
            this.band=true;
            break;
          };
        };
        if(this.band==false){
          continue;
        };
      }else{
        if(this.fechacadenad != "" && this.fechacadenaf != ""){
          continue;
        }
      }

      if(this.band2==true){
        this.serviciosResultado.push(this.servicios[servicio]);
      }
    }
  }



  openDialog(): void{
    const dialogRef = this.dialog.open(PopupComponent,{data:{direccion:'servicio', fechadesde: this.fechacadenad,fechahasta: this.fechacadenaf, 
    idCategoria: this.categoriaSelec, idTipoProducto: this.subcategoriaSelec}});
    dialogRef.afterClosed().subscribe(res => {console.log(res);
     
    });

}


}
