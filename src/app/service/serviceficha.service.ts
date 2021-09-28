import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Ficha } from '../model/ficha';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  getFichasSubCategorias(idTipoProducto: number) {
    throw new Error('Method not implemented.');
  }
  private api: string ="http://181.123.243.5:8080/stock-pwfe/fichaClinica";


  constructor(private http: HttpClient) {}

  getFichas(): Observable<listadatos<Ficha>> {
    return this.http.get<listadatos<Ficha>>(this.api);
  }

  async getFichasP(params: any): Promise<listadatos<Ficha>> {
    return this.http.get<listadatos<Ficha>>(this.api, {params: params}).toPromise();
  }

  getFichasCategoria(idC:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idTipoProducto: {
        idTipoProducto : idC
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
  getFichasSubCategoria(idS:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idTipoProducto: {
        idTipoProducto : idS
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
  async getFichasEmpleados(idP:number): Promise<listadatos<Ficha>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getFichasClientes(idCL:number): Promise<listadatos<Ficha>> {
    const filtro = {
      idCliente: {
        idPersona : idCL
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}}).toPromise();
  }
  getFichasFechas(fd:string, ff:string): Observable<listadatos<Ficha>> {
    const filtro = {
      fechaDesdeCadena: fd,
      fechaHastaCadena: ff
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }

  async getFicha(id: number): Promise<Ficha>{
    //this.api = `${this.api}/${id}`;
    return this.http.get<Ficha>(this.api+"/"+id).toPromise();
  }

  headers = new HttpHeaders({ "Content-Type": "application/json", "usuario": "usuario2" });

  async postFicha(body: any): Promise<Ficha>{
    return this.http.post<Ficha>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();

  }

  async putFicha(body: any): Promise<Ficha>{
    return this.http.put<Ficha>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();

  }
  deleteFicha(idCat: number): Observable<{}>{

    //this.api = `${this.api}/${idCat}`;
    return this.http.delete(this.api+'/'+idCat);
  }



}
