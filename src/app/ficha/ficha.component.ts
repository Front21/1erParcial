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
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';


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
  FichaFiltroCategoria: Ficha[] = [];
  descripcionSelec: string = "";
  //id: number=0;
  mensaje: string="";
  idE: number = 0;
  flagpopup: string = "";
  data: any;

  constructor(private servicioFicha: ServicefichaService,
    private servicioCategoria: ServiceCategoriaService,
    private serviciosubcategoria: ServicesubcategoriaService,
    private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {this.flagpopup = params['flagpopup'];});
    this.route.queryParams.subscribe(params => {this.idE = params['idE'];});
    console.log(this.flagpopup);
    console.log(this.idE);

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
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioCliente.getClientes().subscribe(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Clientes')
    );

    //this.route.queryParams.subscribe(params => {this.id = params['id'];})
    //this.eliminarFicha();

  }

  async buscar(): Promise<void>{
    this.servicioFicha.getFichasCategoria(this.categoriaSelec.idCategoria).subscribe(
      entity => this.FichaFiltroCategoria = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
    );

    this.servicioFicha.getFichasSubCategoria(this.subcategoriaSelec.idTipoProducto).subscribe(
      entity => this.FichaFiltroSubcategoria = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
    );

    await this.servicioFicha.getFichasEmpleados(this.empleadoSelec.idPersona).then(
      entity => this.FichaFiltroEmpleado = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas por Empleados'),
    );

    await this.servicioFicha.getFichasClientes(this.clienteSelec.idPersona).then(
      entity => this.FichaFiltroCliente = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas por Fechas'),
    );

    this.anod= this.fechadesde.toString().substr(0,4);
    this.mesd= this.fechadesde.toString().substr(5,2);
    this.diad= this.fechadesde.toString().substr(8,2);
    this.fechacadenad= this.anod+this.mesd+this.diad;
    this.anof= this.fechahasta.toString().substr(0,4);
    this.mesf= this.fechahasta.toString().substr(5,2);
    this.diaf= this.fechahasta.toString().substr(8,2);
    this.fechacadenaf= this.anof+this.mesf+this.diaf;

    this.servicioFicha.getFichasFechas(this.fechacadenad,this.fechacadenaf).subscribe(
      entity => this.FichaFiltroFecha = entity.lista,
      error =>console.log('1no se pudieron conseguir los paises'),
    );
    this.fichasResultado=[];
    this.cont=0;


    for (var ficha in this.fichas) {

      if(this.FichaFiltroCategoria.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroCategoria){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroCategoria[f1].idFichaClinica){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };

      if(this.FichaFiltroSubcategoria.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroSubcategoria){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroSubcategoria[f1].idFichaClinica){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };

      if(this.FichaFiltroEmpleado.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroEmpleado){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroEmpleado[f1].idFichaClinica){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };

      if(this.FichaFiltroCliente.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroCliente){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroCliente[f1].idFichaClinica){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };

      if(this.FichaFiltroFecha.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroFecha){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroFecha[f1].idFichaClinica){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      if(this.band==true && this.band2==true){
        this.fichasResultado[this.cont]=this.fichas[ficha];
        this.cont=this.cont+1;
      };
      this.band2=false;
      this.band=false;
    };
  };


  eliminarFicha(id: number): void{
    console.log('el id es '+id);
    this.servicioFicha.deleteFicha(id).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
      this.refresh();
  }

  refresh(): void { window.location.reload(); }


  openDialog(): void{
    const dialogRef = this.dialog.open(PopupComponent,{data:{direccion:'ficha', fechadesde: this.fechacadenad,  fechahasta: this.fechacadenaf,
     idCategoria: this.categoriaSelec, idTipoProducto: this.subcategoriaSelec}});
    dialogRef.afterClosed().subscribe(res => {console.log(res);
     
    });

}

};
