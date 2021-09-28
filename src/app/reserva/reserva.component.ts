import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ficha } from '../model/ficha';
import { Persona } from '../model/persona';
import { Reserva } from '../model/reserva';
import { ServiceclienteService } from '../service/servicecliente.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ServicereservaService } from '../service/servicereserva.service';
import {Sort} from "@angular/material/sort";
import {ReservaFull} from "../model/reservaFull";


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reservas: Reserva[]=[];
  reserva: Reserva = new Reserva();
  nuevaRese: Reserva = new Reserva();
  reservasResultado: Reserva[]=[];
  ReservaFiltroFecha: Reserva[]=[];
  ReservaFiltroFechahoy: Reserva[]=[];
  ReservaFiltroEmpleado: Reserva[]=[];
  ReservaFiltroCliente: Reserva[]=[];
  empleados: Persona[] =[];
  empleadoSelec: Persona = new Persona();
  clientes: Persona[] =[];
  clienteSelec: Persona = new Persona();
  mensaje: string = "";
  nuevaReserva: Reserva = new Reserva();
  idReservaSelec: number=0;
  fechaSelec: string="";
  horaInicioSelec: string="";
  horaFinSelec: string="";
  fechaHoraCreacionSelec: string ="";
  FlagAsistioSelec: string ="";
  flagEstadoSelec: string="";
  observacionSelec: string="";
  idFichaClinicaSelec: Ficha = new Ficha();
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
  fechaDesdeSelec: string="";
  fechaHastaSelec: string="";
  horaaper: string="";
  minaper: string="";
  horacie: string="";
  mincie: string="";
  horainicadenaSelec: string="";
  horafincadenaSelec: string="";
  fechadesdecadenad: string="";
  fechahastacadenaf: string="";
  AsistioSelec: string= "";
  cont: number = 0;
  band: boolean =false;
  band2: boolean =false;
  cancelado: string="";
  asistio: string="";
  asistioSelec: string="";
  clickBuscar: boolean = false;
  chechFechaDesde: boolean = false;
  chechFechaHasta: boolean = false;
  id: number = 0;
  fechadehoy: Date = new Date();
  diahoy : string="";
  meshoy: string="";
  anohoy: string="";
  fechacadenahoy: any;
  //fechadehoy:new Date();
  fech:string="";
  mesh: string= "";


  constructor( private route: ActivatedRoute, private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService, private router: Router) { }


  async ngOnInit(): Promise<void> {
    let ejemplo2={
      soloUsuariosDelSistema: true
    }


    let ejemplo;
    var month = this.fechadehoy.getUTCMonth() + 1; //months from 1-12
    this.meshoy= month.toString()
    if(this.meshoy!='10' && this.meshoy!='11' && this.meshoy!='12' )
    {
      this.meshoy="0"+this.meshoy;
    }
    this.diahoy = this.fechadehoy.getUTCDate().toString();
    this.anohoy = this.fechadehoy.getUTCFullYear().toString();
    this.fechacadenahoy= this.anohoy+this.meshoy+this.diahoy;

      console.log(this.fechacadenahoy)

    ejemplo = {
      fechaDesdeCadena: this.fechacadenahoy,
      fechaHastaCadena: this.fechacadenahoy
    }
    await this.servicioReserva.getReservasP({
        orderBy: "idReserva",
        orderDir: "asc",
        like: "S",
        ejemplo: JSON.stringify(ejemplo)
    }).then(
        entity => this.reservas = entity.lista,
        error =>console.log('1no se pudieron conseguir por fecha de hoy'),
        );

    this.servicioEmpleado.getEmpleadosP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
      ejemplo : JSON.stringify(ejemplo2)
    }).then(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );

    this.servicioCliente.getClientesP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
    //this.route.queryParams.subscribe(params => {this.id = params['id'];})

  }

  onChangeObservacion(obse: string,nuevoSelec: Reserva): void{

    this.servicioReserva.putReservaObservacion({idReserva:nuevoSelec.idReserva, observacion:obse, flagAsistio:nuevoSelec.flagAsistio}).subscribe(
      () => {this.mensaje='Cancelado exitosamente'},error => console.log("error: "+error));
  }


  async buscarReserva(active: string, direction: string, desdeSort: boolean): Promise<void>{

    if(!desdeSort){
      this.clickBuscar = true;
    }

    let params;
    let ejemplo;

    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      ejemplo = {
          idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        }
    }

    //No se marca empleado
  if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      ejemplo = {
          idCliente:{
              idPersona:this.clienteSelec.idPersona
            },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
        }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      ejemplo = {
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
      }
    }

    //No se marca cleinte
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;
      ejemplo = {
          idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
          },
          fechaDesdeCadena:this.fechacadenad,
          fechaHastaCadena:this.fechacadenaf
      }
    }else if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined){
      ejemplo = {
        idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
        }
      }
    }

    //No se marca fecha
    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined){
      ejemplo = {
        idCliente:{
              idPersona:this.clienteSelec.idPersona
        },
        idEmpleado:{
            idPersona:this.empleadoSelec.idPersona
        }
      }
    }else if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined && this.fechadesde == undefined && this.fechahasta == undefined){
      ejemplo = {
        idCliente:{
          idPersona:this.clienteSelec.idPersona
        }
      }
    }


    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined && this.fechadesde == undefined && this.fechahasta == undefined &&
    this.clickBuscar == true){
      this.mensaje = "Es necesario marcar opciones de filtro";
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
      await this.servicioReserva.getReservasP(params).then(
        entity => {this.reservas = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    }
  }


  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscarReserva(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = false;
    await this.servicioReserva.getReservasP({
      orderBy: "idReserva",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.reservas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }


  async editarReserva(id: number, asistioSelec: string, obervacionSelec: string): Promise<void>{
      this.servicioReserva.putReserva(
        {idReserva:id, observacion:obervacionSelec, flagAsistio: asistioSelec}).then(
      () => {this.mensaje='Asistio exitosamente'},error => console.log("error: "+error));
  }


  async cancelarReserva(rese: Reserva): Promise<void>{
    console.log(rese);
      this.cancelado= 'C';
      await this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagEstado: this.cancelado}).then(
        () => {this.mensaje='Cancelado exitosamente'},error => console.log("error: "+error));
    }
    async irReservas(): Promise<boolean>{
      return this.router.navigateByUrl('reserva');
    }

   async  marcarasistido(id: number): Promise<void>{
      await this.servicioReserva.putReserva(
        {idReserva:id, flagAsistio: "S"}).then(
        () => {this.mensaje='Asistio exitosamente'},error => console.log("error: "+error));
  
 
    }


}

