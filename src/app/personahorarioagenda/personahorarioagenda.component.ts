import { Component, OnInit } from '@angular/core';
import {Categoria} from "../model/categoria";
import {Ficha} from "../model/ficha";
import {SubCategoria} from "../model/subcategoria";
import {Persona} from "../model/persona";
import {ServiceCategoriaService} from "../service/servicecategoria.service";
import {ServicesubcategoriaService} from "../service/servicesubcategoria.service";
import {PersonahorarioagendaService} from "../service/personahorarioagenda.service";
import {PersonaHorarioAgenda} from "../model/personaHorarioAgenda";
import {ServicefichaService} from "../service/serviceficha.service";
import {ServiceempleadoService} from "../service/serviceempleado.service";
import {listadatos} from "../model/datos";
import {Sort} from "@angular/material/sort";
import { PopupComponent } from '../popup/popup.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-personahorarioagenda',
  templateUrl: './personahorarioagenda.component.html',
  styleUrls: ['./personahorarioagenda.component.css']
})
export class PersonahorarioagendaComponent implements OnInit {
  agendas: PersonaHorarioAgenda[] = [];
  nuevaAgenda: PersonaHorarioAgenda = new PersonaHorarioAgenda();
  mensaje: string = "";
  descripcionSelec: string = "";
  idCategoriaSelec: number = 0;
  fichas: Ficha[] = [];
  fichasResultado: Ficha[]=[];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  subcategoriaSelec: SubCategoria= new SubCategoria();
  AgendaFiltroEmpleado: PersonaHorarioAgenda[] = [];
  AgendaFiltroDia: PersonaHorarioAgenda[] =[];
  AgendaResultado: PersonaHorarioAgenda[] = [];
  empleados: Persona [] = [];
  empleadoSelec: Persona = new Persona();
  empleado: Persona = new Persona();
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
  id: number=0;
  numeros: number[] = [];
  dias: string[] = [];
  diaSelec: number = 0;
  cont2: number = 0;
  clickBuscar: boolean = false;
  public page: number =1;
  idE: number = 0;
  flagpopup: string = "";
  data: any;
  constructor(private servicioPersonaHorarioAgenda: PersonahorarioagendaService,
              public servicioEmpleado: ServiceempleadoService,private route: ActivatedRoute,public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {this.flagpopup = params['flagpopup'];});
    this.route.queryParams.subscribe(params => {this.idE = params['idE'];});
    console.log(this.flagpopup);
    console.log(this.idE);



    this.numeros = [0,1,2,3,4,5,6,7];
    this.dias = [" ", "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    this.servicioPersonaHorarioAgenda.getAgendasP({
      orderBy: "idPersonaHorarioAgenda",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.agendas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

    this.servicioEmpleado.getEmpleadosP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );



  }

  async buscar(active: string, direction: string, desdeSort: boolean): Promise<void>{

    console.log('LLEGUE A BUSCAR');
    console.log(this.empleadoSelec.idPersona);
    console.log(this.diaSelec);
    console.log(this.clickBuscar);

    if(!desdeSort){
      this.clickBuscar = true;
    }

    let params;
    let ejemplo;

    if(this.empleadoSelec.idPersona != undefined && this.diaSelec != 0){
      ejemplo = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        },
        dia: this.diaSelec - 1
      }
    }


    if(this.empleadoSelec.idPersona == undefined && this.diaSelec != 0){
      ejemplo = {
        dia: this.diaSelec - 1
      }
    }

    if(this.empleadoSelec.idPersona != undefined && this.diaSelec == 0){
      ejemplo = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        }
      }
    }

    if(this.empleadoSelec.idPersona == undefined && this.diaSelec == 0 && this.clickBuscar == true){
      this.mensaje = "Es necesario marcar opciones de busqueda."
    }else{
      if(this.clickBuscar){
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
          ejemplo: JSON.stringify(ejemplo)
        }
      }else{
        params = {
          orderBy: active,
          orderDir: direction,
          like: "S",
        }
      }

      console.log(params);
      await this.servicioPersonaHorarioAgenda.getAgendasP(params).then(
        entity => {this.agendas = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    }
  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscar(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = true;
    await this.servicioPersonaHorarioAgenda.getAgendasP({
      orderBy: "idPersonaHorarioAgenda",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.agendas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }

  /*
    crearPersonaHorarioAgenda(): void{
      this.nuevaCategoria.idCategoria = this.idCategoriaSelec;
      this.nuevaCategoria.descripcion = this.descripcionSelec;

      this.servicioCategoria.postCategorias({descripcion: this.nuevaCategoria.descripcion}).subscribe(
        () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    }

    eliminarCategoria(id: number): void{
      this.servicioCategoria.deleteCategoria(id).subscribe(
        () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
      this.refresh();
    }

    refresh(): void { window.location.reload(); }*/

    openDialog(): void{
      const dialogRef = this.dialog.open(PopupComponent,{data:{direccion:'personahorarioagenda', dia: this.diaSelec}});
      dialogRef.afterClosed().subscribe(res => {console.log(res);
       
      });
  
  }
  


}


