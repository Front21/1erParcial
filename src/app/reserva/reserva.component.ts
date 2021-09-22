import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ficha } from '../model/ficha';
import { Persona } from '../model/persona';
import { Reserva } from '../model/reserva';
import { ServiceclienteService } from '../service/servicecliente.service';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { ServicereservaService } from '../service/servicereserva.service';


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
  fechacadenahoy: string="";
  //fechadehoy:new Date();
  fech:string="";
  mesh: string= "";
  

  constructor( private route: ActivatedRoute, private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService, private router: Router) { }


  async ngOnInit(): Promise<void> {
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
      
      await this.servicioReserva.getReservaFechas(this.fechacadenahoy,this.fechacadenahoy).then(
        entity => this.ReservaFiltroFechahoy = entity.lista,
        error =>console.log('1no se pudieron conseguir por fecha de hoy'),
      );
      console.log(this.ReservaFiltroFechahoy.length)

    //this.fechadehoy= this.DateOfBirth.toDateString();
   // console.log(this.fechadehoy);
    this.servicioReserva.getReservas().subscribe(
      entity => this.reservas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Reservas')
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

  }

  onChangeObservacion(obse: string,nuevoSelec: Reserva): void{

    this.servicioReserva.putReservaObservacion({idReserva:nuevoSelec.idReserva, observacion:obse, flagAsistio:nuevoSelec.flagAsistio}).subscribe(
      () => {this.mensaje='Cancelado exitosamente'},error => console.log("error: "+error));
  }


  async buscarReserva(): Promise<void>{
    
    this.clickBuscar = true;

    if(this.empleadoSelec.idPersona != undefined){
      await this.servicioReserva.getReservaEmpleados(this.empleadoSelec.idPersona).then(
        entity => this.ReservaFiltroEmpleado = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Reservas por Empleados'),
      );
    }

    if(this.clienteSelec.idPersona != undefined) {
      await this.servicioReserva.getReservaClientes(this.clienteSelec.idPersona).then(
        entity => this.ReservaFiltroCliente = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Fechas'),
      );
    }
    if(this.fechadesde != undefined && this.fechahasta != undefined){
      this.anod= this.fechadesde.toString().substr(0,4);
      this.mesd= this.fechadesde.toString().substr(5,2);
      this.diad= this.fechadesde.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;
      this.anof= this.fechahasta.toString().substr(0,4);
      this.mesf= this.fechahasta.toString().substr(5,2);
      this.diaf= this.fechahasta.toString().substr(8,2);
      this.fechacadenaf= this.anof+this.mesf+this.diaf;

      await this.servicioReserva.getReservaFechas(this.fechacadenad,this.fechacadenaf).then(
        entity => this.ReservaFiltroFecha = entity.lista,
        error =>console.log('1no se pudieron conseguir los paises'),
      );
   
    };
   this.reservasResultado=[];


   console.log('fechas'+this.ReservaFiltroFecha.length);
    console.log('fechadesde'+this.fechacadenad);
    console.log('fechahasta'+this.fechacadenaf);
   
    console.log('reservas'+this.reservas.length)
    console.log('empleado'+this.ReservaFiltroEmpleado.length);
    console.log('cliente'+this.ReservaFiltroCliente.length);
    console.log('cli'+this.clienteSelec.idPersona)
    console.log('emple'+this.empleadoSelec.idPersona)

    this.actualizarResultadoFiltro();
    console.log('reservaResultado'+this.reservasResultado.length);
   
  }


  actualizarResultadoFiltro(): void {
    for (var reserva in this.reservas) {
      this.band2 = false; //criterio: asegura que todas las listas no hayan sido vacias por no seleccionar nada

      if(this.ReservaFiltroEmpleado.length>0){
        console.log("ENTRO A EMPLEADO");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ReservaFiltroEmpleado){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroEmpleado[s1].idReserva){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          console.log("hola en empleado");
          continue;
        }
        //this.band = false;
      }else{
        if(this.empleadoSelec.idPersona != 0 && this.empleadoSelec.idPersona != undefined){
         
          continue;
        }
      }

      if(this.ReservaFiltroCliente.length>0){
        console.log("ENTRO A CLIENTE");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ReservaFiltroCliente){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroCliente[s1].idReserva){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          console.log("hola en cliente");
          continue;
        }
        //this.band = false;
      }else{
        if(this.clienteSelec.idPersona != 0 && this.clienteSelec.idPersona != undefined){
          
          continue;
        }
      }
     
      if(this.ReservaFiltroFecha.length>0){
        console.log("ENTRO A FECHA");
        this.band2=true;
        this.band=false;
        for (var s1 in this.ReservaFiltroFecha){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroFecha[s1].idReserva){
            this.band=true;
            break;
          };
        };
        if(this.band==false){
          console.log("hola en fecha");
          continue;
        };
      }else{
        if(this.fechacadenad != "" && this.fechacadenaf != ""){
          
          continue;
        }
      }
      if(this.band2==true){
        this.reservasResultado.push(this.reservas[reserva]);
      }
    }
  }

  limpiar(): void{
    this.clickBuscar = false;
    this.reservasResultado = [];
  }


  async asistioReserva(rese: Reserva, asistioSelec: string): Promise<void>{
    console.log(rese.idReserva)
    if (asistioSelec =='S'){
      this.asistio= 'S';
      this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagAsistio: this.asistio}).then(
      () => {this.mensaje='Asistio exitosamente'},error => console.log("error: "+error));
    }
    if (asistioSelec =='N'){
      this.asistio= 'N';
      this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagAsistio: this.asistio}).then(
      () => {this.mensaje='No Asistio exitosamente'},error => console.log("error: "+error));
    }
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

}

