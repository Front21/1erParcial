import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class ServiceloginService {

  
  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<listadatos<Persona>> {
    const filtro = {
      soloUsuariosDelSistema: true
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Persona>>(this.api, {params:{ejemplo}});
  }


}
