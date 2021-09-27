import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Persona } from '../model/persona';
@Injectable({
  providedIn: 'root'
})
export class ServiceclienteService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";
  constructor(private http: HttpClient) {}

  getClientes(): Observable<listadatos<Persona>> {
    const filtro = {
      soloUsuariosDelSistema: false
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Persona>>(this.api, {params:{ejemplo}});
  }

  async getClientesP(params: any): Promise<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.api, {params: params}).toPromise();
  }
}
