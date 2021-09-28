import { Component, OnInit } from '@angular/core';
import {ServicefichaService} from "../../service/serviceficha.service";
import {Ficha} from "../../model/ficha";
import {ServiceempleadoService} from "../../service/serviceempleado.service";
import {Persona} from "../../model/persona";
import {ServiceclienteService} from "../../service/servicecliente.service";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Sort} from "@angular/material/sort";

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
    this.servicioFicha.getFichasP({
      orderBy: "idFichaClinica",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.fichas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Fichas')
    );


    this.servicioEmpleado.getEmpleadosP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );

    this.servicioCliente.getClientesP({
      orderBy: "nombre",
      orderDir: "asc",
      like: "S",
    }).then(
      entity => this.clientes = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Clientes')
    );
  }

  async buscar(active: string, direction: string, desdeSort: boolean): Promise<void>{
    let filtro;
    let param;
    if(!desdeSort){
      this.clickBuscar = true;
    }

    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona != undefined) {
      filtro = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        },
        idCliente: {
          idPersona: this.clienteSelec.idPersona
        }
      }
    }
    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona != undefined) {
      filtro = {
        idCliente: {
          idPersona: this.clienteSelec.idPersona
        }
      }
    }

    if(this.empleadoSelec.idPersona != undefined && this.clienteSelec.idPersona == undefined) {
      filtro = {
        idEmpleado: {
          idPersona: this.empleadoSelec.idPersona
        }
      }
    }

    if(this.empleadoSelec.idPersona == undefined && this.clienteSelec.idPersona == undefined &&
      this.clickBuscar == true){
      this.mensaje = "Es necesario marcar opciones de filtro";
    }else{
      if(this.clickBuscar){
        param = {
          orderBy: active,
          orderDir: direction,
          like: "S",
          ejemplo: JSON.stringify(filtro)
        }
      }else{
        param = {
          orderBy: active,
          orderDir: direction,
          like: "S",
        }
      }

      console.log(param);
      await this.servicioFicha.getFichasP(param).then(
        entity => {this.fichas = entity.lista
          console.log("Resultado Actualziado")},
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    }


  }


  async limpiar(): Promise<void>{
    this.clickBuscar = false;
    const param = {
      orderBy: "idFichaClinica",
      orderDir: "asc",
      like: "S"
    }
    this.servicioFicha.getFichasP(param).then(
      entity => this.fichas = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.buscar(sort.active, sort.direction, true);
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
