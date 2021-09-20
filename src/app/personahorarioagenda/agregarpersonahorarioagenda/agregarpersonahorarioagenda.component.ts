import {Component, NgZone, OnInit, SimpleChanges} from '@angular/core';
import { Categoria} from "../../model/categoria";
import { Ficha} from "../../model/ficha";
import { ServiceCategoriaService} from "../../service/servicecategoria.service";
import { ServicesubcategoriaService} from "../../service/servicesubcategoria.service";
import { ServiceempleadoService} from "../../service/serviceempleado.service";
import { ServicefichaService} from "../../service/serviceficha.service";
import { SubCategoria} from "../../model/subcategoria";
import { Persona} from "../../model/persona";
import { ServiceclienteService} from "../../service/servicecliente.service";
import {Time} from "@angular/common";
import {PersonaHorarioAgenda} from "../../model/personaHorarioAgenda";
import {PersonahorarioagendaService} from "../../service/personahorarioagenda.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agregarpersonahorarioagenda',
  templateUrl: './agregarpersonahorarioagenda.component.html',
  styleUrls: ['./agregarpersonahorarioagenda.component.css']
})
export class AgregarpersonahorarioagendaComponent implements OnInit {
  fichas: Ficha[] = [];
  fichasResultado: Ficha[]=[];
  categorias: Categoria[] = [];
  subcategorias: SubCategoria[] =[];
  categoriaSelec: Categoria = new Categoria();
  nuevaagenda: PersonaHorarioAgenda = new PersonaHorarioAgenda();
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
  numeros: number[] = [0,1,2,3,4,5,6];
  dias: string[] = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  diaSelec: number = 0;
  horaapercadenaSelec: string = "";
  horaciecadenaSelec: string = ""; horaAperturaSelec:string="";
  horaCierreSelec: string=""; horaaper: string="";
  minaper: string="";
  horacie: string="";
  mincie: string="";
  intervaloSelec: number = 0;

  constructor(private servicioAgenda: PersonahorarioagendaService,
              private servicioCategoria: ServiceCategoriaService,
              private serviciosubcategoria: ServicesubcategoriaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService,
              private router: Router) { }

  ngOnInit(): void {

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

  }

  async crearAgenda(): Promise<void>{

    this.nuevaagenda.idEmpleado = this.empleadoSelec;
    this.nuevaagenda.dia = this.diaSelec;


    this.horaaper= this.horaAperturaSelec.toString().substr(0,2);
    this.minaper= this.horaAperturaSelec.toString().substr(3,5);
    this.horacie= this.horaCierreSelec.toString().substr(0,2);
    this.mincie= this.horaCierreSelec.toString().substr(3,5);
    this.horaapercadenaSelec= this.horaaper+this.minaper;
    this.horaciecadenaSelec= this.horacie+this.mincie;

    this.nuevaagenda.horaAperturaCadena = this.horaapercadenaSelec;
    this.nuevaagenda.horaCierreCadena = this.horaciecadenaSelec;

    this.servicioAgenda.postAgenda({
      dia: this.nuevaagenda.dia,
      horaAperturaCadena: this.nuevaagenda.horaAperturaCadena,
      horaCierreCadena: this.nuevaagenda.horaCierreCadena,
      intervaloMinutos: this.intervaloSelec,
      idEmpleado:{
        idPersona: this.nuevaagenda.idEmpleado.idPersona
      }
    }).subscribe(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irListadoAgenda();
  }

  async irListadoAgenda(): Promise<boolean>{
    return this.router.navigateByUrl('personahorarioagenda');
  }
}
