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
  numeros: number[] = [0,1,2,3,4,5,6];
  dias: string[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  diaSelec: number = 0;
  cont2: number = 0;
  clickBuscar: boolean = false;
  public page: number =1;

  constructor(private servicioPersonaHorarioAgenda: PersonahorarioagendaService,
              public servicioEmpleado: ServiceempleadoService,
  ) { }

  ngOnInit(): void {
    this.servicioPersonaHorarioAgenda.getAgendas().subscribe(
      entity => this.agendas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );



  }

  async buscar(): Promise<void>{
    this.clickBuscar = true;

    console.log('LLEGUE A BUSCAR');
    console.log(this.empleadoSelec.idPersona);
    console.log(this.diaSelec);

    await this.servicioPersonaHorarioAgenda.getAgendasEmpleados(this.empleadoSelec.idPersona).then(
      entity => {
        this.AgendaFiltroEmpleado = entity.lista;
        },
        error =>console.log('No se pudo acceder a la lista de Fichas por Categorias')
    );

    await this.servicioPersonaHorarioAgenda.getAgendasDia(this.diaSelec).then(
      (entity: listadatos<PersonaHorarioAgenda>) => {
        this.AgendaFiltroDia = entity.lista;
      },
      error =>console.log('No se pudo acceder a la lista de Fichas por Categorias'),
    );

    this.actualizarResultado();
  };

  private actualizarResultado() : void {
    this.AgendaResultado = [];
    for (var agenda in this.agendas) {

      if (this.AgendaFiltroEmpleado.length > 0) {
        this.band2 = true;
        this.band = false;
        for (var a1 in this.AgendaFiltroEmpleado) {
          if (this.agendas[agenda].idPersonaHorarioAgenda == this.AgendaFiltroEmpleado[a1].idPersonaHorarioAgenda) {
            this.band = true;
            break;
          };
        };
        if (this.band == false) {
          continue;
        };
        this.band = false;
      };

      if (this.AgendaFiltroDia.length > 0) {
        this.band2 = true;
        this.band = false;
        for (var a1 in this.AgendaFiltroDia) {
          if (this.agendas[agenda].idPersonaHorarioAgenda == this.AgendaFiltroDia[a1].idPersonaHorarioAgenda) {
            this.band = true;
            break;
          };
        };
        if (this.band == false) {
          continue;
        };
      }

      if (this.band == true && this.band2 == true) {
        this.AgendaResultado.push(this.agendas[agenda]);
      }
      this.band2 = false;
      this.band = false;
    };

    console.log(this.AgendaFiltroEmpleado.length);
    console.log(this.AgendaFiltroDia.length);

    console.log(this.dias.length) ;
    console.log(this.AgendaResultado.length);
  }

  limpiar(): void{
    this.clickBuscar = false;
    this.AgendaResultado = [];
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
}


