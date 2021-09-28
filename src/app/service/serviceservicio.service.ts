import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {listadatos} from "../model/datos";
import {Ficha} from "../model/ficha";
import {Servicio} from "../model/servicio";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {PersonaHorarioAgenda} from "../model/personaHorarioAgenda";
import {Detalle} from "../model/detalle";

@Injectable({
  providedIn: 'root'
})
export class ServiceservicioService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/servicio";

  constructor(private http: HttpClient) { }

  getServicios(): Observable<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api);
  }

  async getServiciosP(params: any): Promise<listadatos<Servicio>> {
    return this.http.get<listadatos<Servicio>>(this.api, {params: params}).toPromise();
  }

  getServiciosDetallados(): Observable<listadatos<Detalle>> {
    const detalle = "S";
    return this.http.get<listadatos<Detalle>>(this.api, {params:{detalle}});
  }

  async getServicioDetalladoEspecifico(filtro: any): Promise<listadatos<Detalle>> {
    const detalle = "S";
    const ejemplo = JSON.stringify(filtro);
    return this.http.get<listadatos<Detalle>>(this.api, {params:{detalle, ejemplo}}).toPromise();
  }

  async getServicio(id: number): Promise<Servicio>{
    return this.http.get<Servicio>(this.api+'/'+id).toPromise();
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

  async getDetalles(id: number): Promise<Detalle[]> {
    console.log("id "+id);
    return this.http.get<Detalle[]>(this.api+'/'+id+'/detalle').toPromise();
  }

  async getDetalle(idS: number, idD: number): Promise<Detalle> {
    return this.http.get<Detalle>(this.api+'/'+idS+'/detalle/'+idD).toPromise();
  }

  headers = new HttpHeaders({ "Content-Type": "application/json", "usuario": "usuario2" });

  async postServicio(body: any): Promise<Servicio>{
    return this.http.post<Servicio>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }

  async postDetalle(body: any, idS: number): Promise<Detalle>{
    return this.http.post<Detalle>(this.api+'/'+idS+'/detalle', body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }

  putServicio(body: any): Observable<Servicio>{
    return this.http.put<Servicio>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }

  async deleteDetalle(idS: number, idD: number): Promise<{}>{
    return this.http.delete(this.api+'/'+idS+'/detalle/'+idD).toPromise();
  }

  async deleteServicio(idS: number): Promise<{}>{
    return this.http.delete(this.api+'/'+idS).toPromise();
  }
}
