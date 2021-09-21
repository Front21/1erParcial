import { Component, OnInit } from '@angular/core';
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
  reservasuplente: Reserva = new Reserva();
  reserva: Reserva = new Reserva();
  reservasResultado: Reserva[]=[];
  ReservaFiltroFecha: Reserva[]=[];
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
  constructor( private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService) { }


  ngOnInit(): void {

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


  }

  buscarReserva(): void{
    
    this.anod= this.fechadesde.toString().substr(0,4); 
    this.mesd= this.fechadesde.toString().substr(5,2);
    this.diad= this.fechadesde.toString().substr(8,2);
    this.fechacadenad= this.anod+this.mesd+this.diad;
    this.anof= this.fechahasta.toString().substr(0,4); 
    this.mesf= this.fechahasta.toString().substr(5,2);
    this.diaf= this.fechahasta.toString().substr(8,2);
    this.fechacadenaf= this.anof+this.mesf+this.diaf;

    this.servicioReserva.getReservaEmpleados(this.empleadoSelec.idPersona).subscribe(
      entity => this.ReservaFiltroEmpleado = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Reservas por Empleados'), 
    );
    
    this.servicioReserva.getReservaClientes(this.clienteSelec.idPersona).subscribe(
      entity => this.ReservaFiltroCliente = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Reservas por Fechas'), 
    );

      
    this.servicioReserva.getReservaFechas(this.fechacadenad,this.fechacadenaf).subscribe(
      entity => this.ReservaFiltroFecha = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Reservas por Fechas'), 
    );
    
  
    this.cont=0;

    
    for (var reserva in this.reservas) {
      
      if(this.ReservaFiltroEmpleado.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.ReservaFiltroEmpleado){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroEmpleado[f1].idReserva){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      
      if(this.ReservaFiltroCliente.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.ReservaFiltroCliente){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroCliente[f1].idReserva){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      
      if(this.ReservaFiltroFecha.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.ReservaFiltroFecha){
          if(this.reservas[reserva].idReserva==this.ReservaFiltroFecha[f1].idReserva){
              this.band=true;
              break;
          };
        };
        if(this.band==false){
          continue;
        };
      };
      
      
      if(this.band==true && this.band2==true){
        this.reservasResultado[this.cont]=this.reservas[reserva];
        this.cont=this.cont+1; 
      };
      this.band2=false;
      this.band=false; 
    };  
  };

 Asistio(id:number): void{
   console.log(id)
  // if()


 }

 asistioReserva(rese: Reserva, asistioSelec: string): void{
  console.log(rese.idReserva)
  if (asistioSelec =='S'){
    this.asistio= 'S';
    this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagAsistio: this.asistio}).subscribe(
    () => {this.mensaje='Asistio exitosamente'},error => console.log("error: "+error));
  }
  if (asistioSelec =='N'){
    this.asistio= 'N';
    this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagAsistio: this.asistio}).subscribe(
    () => {this.mensaje='No Asistio exitosamente'},error => console.log("error: "+error));
  }
}
  eliminarReserva(id: number): void{
    this.servicioReserva.deleteReserva(id).subscribe(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
      this.refresh();
  }

  cancelarReserva(rese: Reserva): void{
    this.cancelado= 'C';
    this.servicioReserva.putReservaCancelar({idReserva:rese.idReserva, observacion:rese.observacion, flagEstado: this.cancelado}).subscribe(
      () => {this.mensaje='Cancelado exitosamente'},error => console.log("error: "+error));
  }

  refresh(): void { window.location.reload(); }


}

