import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Paciente } from '../model/paciente';
import { Persona } from '../model/persona';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServicepacientesService {

  private api: string ="http://181.123.243.5:8080/stock-pwfe/persona";


  constructor(private http: HttpClient) {}

  getPaciente(): Observable<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.api);
  }
  async getPacienteFiltro(params:any): Promise<listadatos<Persona>> {
    return this.http.get<listadatos<Persona>>(this.api, {params:params}).toPromise();
  }
  async getPacienteEditar(id:number): Promise<Persona> {
    return this.http.get<Persona>(this.api+"/"+id).toPromise();
  }
  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  async postPaciente(body: any): Promise<Persona>{
    return this.http.post<Persona>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }
  async putPaciente(body: any): Promise<Persona>{
    return this.http.put<Persona>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }
  async eliminarPaciente(idPersona: number): Promise<{}>{


    return this.http.delete(this.api+"/"+idPersona).toPromise();
  }
}
