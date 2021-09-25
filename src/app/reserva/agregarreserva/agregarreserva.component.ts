import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ficha } from 'src/app/model/ficha';
import { Persona } from 'src/app/model/persona';
import { Reserva } from 'src/app/model/reserva';
import { ServiceclienteService } from 'src/app/service/servicecliente.service';
import { ServiceempleadoService } from 'src/app/service/serviceempleado.service';
import { ServicereservaService } from 'src/app/service/servicereserva.service';
import {FormsModule, NgForm} from '@angular/forms';
import {Agenda} from "../../model/agenda";
import {Router} from "@angular/router";


@Component({
  selector: 'app-agregarreserva',
  templateUrl: './agregarreserva.component.html',
  styleUrls: ['./agregarreserva.component.css']
})
export class AgregarreservaComponent implements OnInit {

  reservas: Reserva[]=[];
  reservaResultado: Reserva[]=[];
  empleados: Persona[] =[];
  clientes: Persona[] =[];
  clienteSelec: Persona = new Persona();
  nuevaReserva: Reserva = new Reserva();
  idReservaSelec: number=0;
  fechaSelec: any;
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
  id: number = 0;
  fecha: string = "";
  agendas: Reserva[] = [];
  horaIni: string[] = [];
  horaFin: string[] = [];
  clienteA: string[] = [];
  agendaFinal: Agenda[] = [];
  cont: number = 0;
  clickBuscar: boolean = false;
  mensajeBuscar: string = "";
  agendaIdSelec: number = 0;
  repetido: boolean = false;


  constructor(private servicioReserva : ServicereservaService, private servicioEmpleado: ServiceempleadoService,
    private servicioCliente: ServiceclienteService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = 2; //xd
    this.fecha = "20190905"; //xd
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

    //Disponible se utiliza para filtrar solo las agendas libres, false para filtras libres y ocupados
    await this.filtro(false, this.fecha, this.id);



  }

  async filtro(noNecesitaDisponible: boolean, fecha: string, id: number): Promise<void>{
    this.agendaFinal = [];
    console.log(this.fecha);
    if(!noNecesitaDisponible){
      await this.servicioReserva.getAgendasConDisponible(id, fecha, "S").then(
        entity => this.agendas = entity,
        error =>console.log('No se pudo acceder a la lista de Reservas')
      );
    }else{
      await this.servicioReserva.getAgendasSinDisponible(id, fecha).then(
        entity => this.agendas = entity,
        error =>console.log('No se pudo acceder a la lista de Reservas')
      );

    }
    console.log('LENGTH agendas'+this.agendas.length);
    this.cont = 0;
    for(var agenda in this.agendas){
      let agendaEntry: Agenda = new Agenda();
      if(this.agendas[agenda].idReserva != null){
        agendaEntry.idAgenda = this.cont;
        agendaEntry.fechaCadena = this.agendas[agenda].fechaCadena;
        agendaEntry.horaInicioCadena = this.agendas[agenda].horaInicioCadena;
        agendaEntry.horaFinCadena = this.agendas[agenda].horaFinCadena;
        agendaEntry.cliente = this.agendas[agenda].idCliente.nombre+' '+this.agendas[agenda].idCliente.apellido;
      }else{
        agendaEntry.idAgenda = this.cont;
        agendaEntry.fechaCadena = this.agendas[agenda].fechaCadena;
        agendaEntry.horaInicioCadena = this.agendas[agenda].horaInicioCadena;
        agendaEntry.horaFinCadena = this.agendas[agenda].horaFinCadena;
        agendaEntry.cliente = '-';
      }
      //Verificar que las horas no sean las mismas
      this.repetido = false;
      for(var agendaF in this.agendaFinal){
        if(this.agendaFinal[agendaF].horaInicioCadena == agendaEntry.horaInicioCadena){
          this.repetido = true;
        }
      }

      if(!this.repetido){
        this.agendaFinal.push(agendaEntry);
      }
      this.cont = this.cont + 1;
    }
    console.log('LENGTH agendaFinal'+this.agendaFinal.length);

    if(this.agendaFinal.length == 0){
      this.mensajeBuscar = "No existenresultados para esta busqueda."
    }

  }

  public isChecked$ = new BehaviorSubject(false);
  toggleChecked() {
    this.isChecked$.next(!this.isChecked$.value)
    console.log(this.isChecked$.value)
    if(this.isChecked$.value){
      //No es cuando cargo recien la pagina
      if(this.clickBuscar){
        this.buscarReservaenCrear(true);
      }else{//Cargo recien la pagina
        this.filtro(true, this.fecha, this.id);
      }
    }else{
      if(this.clickBuscar){
        this.buscarReservaenCrear(true);
      }else{
        this.filtro(false, this.fecha, this.id);
      }
    }
  }

  buscarReservaenCrear(desdeCheck: boolean): void{
    this.agendaFinal = [];
    this.mensajeBuscar = "";
    if(!desdeCheck){
      this.clickBuscar = true;
    }
    if(this.fechaSelec != undefined && this.empleadoSelec.idPersona != undefined){
      this.anod= this.fechaSelec.toString().substr(0,4);
      this.mesd= this.fechaSelec.toString().substr(5,2);
      this.diad= this.fechaSelec.toString().substr(8,2);
      this.fechacadenad= this.anod+this.mesd+this.diad;

      if(this.isChecked$.value){
        this.filtro(true, this.fechacadenad, this.empleadoSelec.idPersona);
      }else{
        this.filtro(false, this.fechacadenad, this.empleadoSelec.idPersona);
      }
    }

    if(this.fechaSelec != undefined && this.empleadoSelec.idPersona == undefined){
      this.mensajeBuscar = "Por favor, marca un empleado.";
    }

    if(this.fechaSelec == undefined && this.empleadoSelec.idPersona != undefined){
      this.mensajeBuscar = "Por favor, marca una fecha.";
    }

    if(this.fechaSelec == undefined && this.empleadoSelec.idPersona == undefined){
      this.mensajeBuscar = "Por favor, marca una fecha y un empleado.";
    }



   // this.servicioReserva.getReservaEmpleadosenCrear(this.empleadoSelec.idPersona,this.fechacadenad).subscribe(
     // entity => this.reservaResultado = entity.lista,
      //error =>console.log('No se pudo acceder a la lista de Reservas por Empleados'),
    //);


  }


 seleccionado(reser: Reserva): void{
   console.log(reser.idReserva)

 }


  async crearReserva(): Promise<void>{

    //Si se elige el usuario y la fecha default
    if(!this.clickBuscar){
      this.fechacadenad = this.fecha;
      this.empleadoSelec.idPersona = this.id;
    }

    let agendaSelec = this.agendaFinal.find(agenda => agenda.idAgenda == this.agendaIdSelec);

    //console.log('idAgenda: '+ agendaSelec.idAgenda);
    if(agendaSelec){
      console.log('fechaCadena: '+ this.fechacadenad);
      console.log('horaIni: '+ agendaSelec.horaInicioCadena);
      console.log('horaFin: '+ agendaSelec.horaFinCadena);
      console.log('idEmple: '+ this.empleadoSelec.idPersona);
      console.log('idClien: '+ this.clienteSelec.idPersona);
      console.log('observacion: '+ this.observacionSelec);
      console.log('idSelec: '+ this.agendaIdSelec);
      console.log('idAgenda: '+ agendaSelec.idAgenda);

      await this.servicioReserva.postReservas({
        fechaCadena: this.fechacadenad,
        horaInicioCadena: agendaSelec.horaInicioCadena,
        horaFinCadena: agendaSelec.horaFinCadena,
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        },
        idCliente: {
          idPersona: this.clienteSelec.idPersona
        },
        observacion: this.observacionSelec
      }).then(
        () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));


    }


    await this.irListadoReservas();

  }
  async irListadoReservas(): Promise<boolean>{
    return this.router.navigateByUrl('reserva');
  }


}

