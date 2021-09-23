import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Paciente } from '../model/paciente';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class ServicepacientesService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";


  constructor(private http: HttpClient) {}

  getPaciente(): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.api);
  }
  async getPacienteFiltro(parametro:any): Promise<listadatos<Persona>> {
    const ejemplo = JSON.stringify(parametro)
    return this.http.get<listadatos<Persona>>(this.api, {params:{ejemplo}}).toPromise();
  }
}
