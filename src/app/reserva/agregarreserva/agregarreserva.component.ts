import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ficha } from 'src/app/model/ficha';
import { Persona } from 'src/app/model/persona';
import { Reserva } from 'src/app/model/reserva';
import { ServiceclienteService } from 'src/app/service/servicecliente.service';
import { ServiceempleadoService } from 'src/app/service/serviceempleado.service';
import { ServicereservaService } from 'src/app/service/servicereserva.service';
import {FormsModule, NgForm} from '@angular/forms';


@Component({
  selector: 'app-agregarreserva',
  templateUrl: './agregarreserva.component.html',
  styleUrls: ['./agregarreserva.component.css']
})
export class AgregarreservaComponent implements OnInit {

  reservas: Reserva[]=[];
  reservaResultado: Reserva[]=[];
  empleados: Persona[] =[];
  empleaadoSelec: Persona = new Persona();
  clientes: Persona[] =[];
  clienteSelec: Persona = new Persona();
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
  mensaje: string="";
  ReservaFiltroFecha: Reserva[]=[];
  ReservaFiltroEmpleado: Reserva[]=[];
  empleadoSelec: Persona = new Persona();
  listar: string="";
  asistioSelec: string ="";


  constructor(private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
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

  public isChecked$ = new BehaviorSubject(false);
        toggleChecked() {
        this.isChecked$.next(!this.isChecked$.value)
        console.log(this.isChecked$.value)
  }
 
  buscarReservaenCrear(): void{
    
    this.anod= this.fechadesde.toString().substr(0,4); 
    this.mesd= this.fechadesde.toString().substr(5,2);
    this.diad= this.fechadesde.toString().substr(8,2);
    this.fechacadenad= this.anod+this.mesd+this.diad;

    
   // this.servicioReserva.getReservaEmpleadosenCrear(this.empleadoSelec.idPersona,this.fechacadenad).subscribe(
     // entity => this.reservaResultado = entity.lista,
      //error =>console.log('No se pudo acceder a la lista de Reservas por Empleados'), 
    //);


  }


 seleccionado(reser: Reserva): void{
   console.log(reser.idReserva)
   
 }
 

  crearReserva(): void{

    //this.nuevaReserva.idReserva = this.idReservaSelec;
    this.nuevaReserva.fechaCadena = this.fechaSelec;
    this.nuevaReserva.fechaDesdeCadena = this.fechadesdecadenad;
    this.nuevaReserva.fechaHastaCadena = this.fechahastacadenaf;
    this.nuevaReserva.horaInicioCadena = this.horainicadenaSelec;
    this.nuevaReserva.horaFinCadena = this.horafincadenaSelec;
    this.nuevaReserva.fechaHoraCreacion = this.fechaHoraCreacionSelec;
    this.nuevaReserva.flagEstado = this.flagEstadoSelec;
    this.nuevaReserva.flagAsistio = this.FlagAsistioSelec;
    this.nuevaReserva.observacion = this.observacionSelec;
    this.nuevaReserva.idFichaClinica = this.idFichaClinicaSelec;
    
  
    //this.servicioReserva.postReservas({idReserva: this.nuevaReserva.idReserva, fecha: this.nuevaReserva.fechaCadena, fechaDesdeCadena: this.nuevaReserva.fechaDesdeCadena, 
      //fechaHastaCadena: this.nuevaReserva.fechaHastaCadena, horaInicio: this.nuevaReserva.horaInicioCadena, horaFin: this.nuevaReserva.horaFinCadena, 
      //fechaHoraCreacion: this.nuevaReserva.fechaHoraCreacion, flagEstado: this.nuevaReserva.flagEstado, 
      //flagAsistio: this.nuevaReserva.flagAsistio, observacion: this.nuevaReserva.observacion, idFichaClinica: this.nuevaReserva.idFichaClinica}).subscribe(
      //() => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

  }


}

