import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { HorarioExcepcion } from '../model/horarioExcepcion';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServicehorarioexcepcionService {
  
  private api: string ="http://181.123.243.5:8080/stock-pwfe/horarioExcepcion";

  constructor(private http: HttpClient) { }


  gethorarioExcepcion(): Observable<listadatos<HorarioExcepcion>> {
    return this.http.get<listadatos<HorarioExcepcion>>(this.api);
  }

  gethorarioexcepcionEmpleados(idP:number): Observable<listadatos<HorarioExcepcion>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<HorarioExcepcion>>(this.api, {params:{ejemplo}});
  }

  gethorarioexcepcionFechas(fd:string): Observable<listadatos<HorarioExcepcion>> {
    const filtro = {
      fechaCadena: fd
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<HorarioExcepcion>>(this.api, {params:{ejemplo}});
  }

  headers = new HttpHeaders({ "Content-Type": "application/json", "usuario": "usuario2" });
  postHorarioexcepcion(body: any): Observable<HorarioExcepcion>{
    return this.http.post<HorarioExcepcion>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );

  }
  getHorarioexcepcion(id: number): Observable<HorarioExcepcion>{
    this.api = `${this.api}/${id}`;
    return this.http.get<HorarioExcepcion>(this.api);
  }

  deleteHorarioexcepcion(idCat: number): Observable<{}>{
    this.api = `${this.api}/${idCat}`;
    return this.http.delete(this.api);
  }

  putHorarioExcepcion(body: any): Observable<HorarioExcepcion>{
    return this.http.put<HorarioExcepcion>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }


}
