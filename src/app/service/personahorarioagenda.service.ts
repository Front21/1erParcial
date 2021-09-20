import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {listadatos} from "../model/datos";
import {PersonaHorarioAgenda} from "../model/personaHorarioAgenda";
import {tap} from "rxjs/operators";
import {Ficha} from "../model/ficha";

@Injectable({
  providedIn: 'root'
})
export class PersonahorarioagendaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/personaHorarioAgenda";

  constructor(private http: HttpClient) {}

  getAgendas(): Observable<listadatos<PersonaHorarioAgenda>> {
    return this.http.get<listadatos<PersonaHorarioAgenda>>("http://181.123.243.5:8080/stock-pwfe/personaHorarioAgenda");
  }

  async getAgendasEmpleados(idE:number): Promise<listadatos<PersonaHorarioAgenda>> {
    console.log('En el servicio llega este id'+idE);
    const filtro = {
      idEmpleado: {
        idPersona: idE
      }
    }
    const ejemplo = JSON.stringify(filtro);
    return this.http.get<listadatos<PersonaHorarioAgenda>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getAgendasDia(dia:number): Promise<listadatos<PersonaHorarioAgenda>> {
    const filtro = {
      dia: dia
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<PersonaHorarioAgenda>>(this.api, {params:{ejemplo}}).toPromise();
  }

  getAgenda(id: number): Observable<PersonaHorarioAgenda>{
    return this.http.get<PersonaHorarioAgenda>(this.api+'/'+id);
  }

  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  postAgenda(body: any): Observable<PersonaHorarioAgenda>{
    return this.http.post<PersonaHorarioAgenda>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }

  putAgenda(body: any): Observable<PersonaHorarioAgenda>{
    return this.http.put<PersonaHorarioAgenda>(this.api, body,{
      headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }


  async deleteAgenda(idAgen: number): Promise<{}>{
    return this.http.delete(this.api+'/'+idAgen).toPromise();
  }


  /*
  getCategoria(id: number): Observable<Categoria>{
    this.api = `${this.api}/${id}`;
    return this.http.get<Categoria>(this.api);
  }

  putCategoria(body: any): Observable<Categoria>{
    return this.http.put<Categoria>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }*/
}
