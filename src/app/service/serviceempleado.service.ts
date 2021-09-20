import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Persona } from '../model/persona';
import {Ficha} from "../model/ficha";
@Injectable({
  providedIn: 'root'
})
export class ServiceempleadoService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";
  constructor(private http: HttpClient) {}


  getEmpleados(): Observable<listadatos<Persona>> {
    const filtro = {
      soloUsuariosDelSistema: true
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Persona>>(this.api, {params:{ejemplo}});
  }

  getEmpleado(id: number): Observable<Persona>{
    this.api = `${this.api}/${id}`;
    return this.http.get<Persona>(this.api);
  }

}
