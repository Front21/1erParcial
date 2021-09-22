import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {listadatos} from "../model/datos";
import {Ficha} from "../model/ficha";
import {Servicio} from "../model/servicio";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceservicioService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/servicio";

  constructor(private http: HttpClient) { }

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api);
  }

  async getServiciosEmpleados(idP:number): Promise<listadatos<Servicio>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Servicio>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getServiciosSubCategoria(idS:number): Promise<listadatos<Servicio>> {
    console.log('ID DE CATEGORIA QUE LLEGA SERVICIO: '+idS);
    const filtro = {
      idFichaClinica:{
        idTipoProducto: {
          idTipoProducto : idS
        }
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Servicio>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getServiciosCliente(idC: number): Promise<listadatos<Servicio>> {
    const filtro = {
      idFichaClinica:{
        idCliente: {
          idPersona : idC
        }
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Servicio>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getServiciosFechas(fd:string, ff:string): Promise<listadatos<Servicio>> {
    const filtro = {
      fechaDesdeCadena: fd,
      fechaHastaCadena: ff
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Servicio>>(this.api, {params:{ejemplo}}).toPromise();
  }
}
