import { Component, OnInit } from '@angular/core';
import {ServicefichaService} from "../../service/serviceficha.service";
import {Ficha} from "../../model/ficha";
import {ServiceempleadoService} from "../../service/serviceempleado.service";
import {Persona} from "../../model/persona";
import {ServiceclienteService} from "../../service/servicecliente.service";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-agregarservicio',
  templateUrl: './agregarservicio.component.html',
  styleUrls: ['./agregarservicio.component.css']
})
export class AgregarservicioComponent implements OnInit {

  fichas: Ficha[] = [];
  empleados: Persona[] = [];
  clientes: Persona[] = [];
  empleadoSelec: Persona = new Persona();
  clienteSelec: Persona = new Persona();
  FichaFiltroEmpleado: Ficha[] = [];
  FichaFiltroCliente: Ficha[] = [];
  FichaResultado: Ficha[] = [];
  band: boolean = false;
  band2: boolean = false;
  observacion: string = "";
  clickBuscar: boolean = false;
  fichaSelec: number = 0;
  mensaje: string = "";

  constructor(private servicioFicha: ServicefichaService,
              private servicioEmpleado: ServiceempleadoService,
              private servicioCliente: ServiceclienteService,
              private servicioServicio: ServiceservicioService,
              private router: Router) { }

  ngOnInit(): void {
    this.servicioFicha.getFichas().subscribe(
      entity => this.fichas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioCliente.getClientes().subscribe(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );
  }

  async buscar(): Promise<void>{

    this.clickBuscar = true;
    if(this.empleadoSelec.idPersona != undefined) {
      await this.servicioFicha.getFichasEmpleados(this.empleadoSelec.idPersona).then(
        entity => this.FichaFiltroEmpleado = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Empleados'),
      );
    }

    if(this.clienteSelec.idPersona != undefined) {
      await this.servicioFicha.getFichasClientes(this.clienteSelec.idPersona).then(
        entity => this.FichaFiltroCliente = entity.lista,
        error => console.log('No se pudo acceder a la lista de Fichas por Fechas'),
      );
    }

    this.FichaResultado=[];
    this.actualizarResultadoFiltro();
  }

  actualizarResultadoFiltro(): void{
    for (var ficha in this.fichas) {
      this.band2 = false; //criterio: asegura que todas las listas no hayan sido vacias por no seleccionar nada
      if(this.FichaFiltroEmpleado.length>0){
        this.band2=true;
        this.band=false; //criterio si no se encuentra en una lista cargada, se debe rechazar
        for (var f1 in this.FichaFiltroEmpleado){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroEmpleado[f1].idFichaClinica){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          continue;
        }
      }else{
        if(this.empleadoSelec.idPersona != 0 && this.empleadoSelec.idPersona != undefined){
          continue;
        }
      }

      if(this.FichaFiltroCliente.length>0){
        this.band2=true;
        this.band=false;
        for (var f1 in this.FichaFiltroCliente){
          if(this.fichas[ficha].idFichaClinica==this.FichaFiltroCliente[f1].idFichaClinica){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          continue;
        }
      }else{
        if(this.clienteSelec.idPersona != 0 && this.clienteSelec.idPersona != undefined){
          continue;
        }
      }

      if(this.band2==true){
        this.FichaResultado.push(this.fichas[ficha]);
      }
    }
  }

  async crearServicio(): Promise<void>{
    await this.servicioServicio.postServicio({
      idFichaClinica: {
      idFichaClinica:this.fichaSelec
    },
      observacion:this.observacion
    }
    ).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irListadoServicio();
  }

  async irListadoServicio(): Promise<boolean>{
    return this.router.navigateByUrl('servicio');

  }

}
