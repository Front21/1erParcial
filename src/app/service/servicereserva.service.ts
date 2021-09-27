import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { listadatos } from '../model/datos';
import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ServicereservaService {

  status: string="";

  private api: string ="http://181.123.243.5:8080/stock-pwfe/reserva";

  constructor(private http: HttpClient) {   }

  getReservas(): Observable<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(this.api);
  }

  async getReservasP(params: any): Promise<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(this.api, {params: params}).toPromise();
  }

  async getReservaEmpleados(idP:number): Promise<listadatos<Reserva>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}}).toPromise();
  }
  getReservaEmpleadosenCrear(idP:number): Observable<listadatos<Reserva>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}});
  }

  async getReservaClientes(idCL:number): Promise<listadatos<Reserva>> {
    const filtro = {
      idCliente: {
        idPersona : idCL
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getReservaFechaencrear(fd:string): Promise<listadatos<Reserva>> {
    const filtro = {
      fechaDesdeCadena: fd
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getReservaFechas(fd:string, ff:string): Promise<listadatos<Reserva>> {
    const filtro = {
      fechaDesdeCadena: fd,
      fechaHastaCadena: ff
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}}).toPromise();
  }

  async getAgendasConDisponible(id: number, f: string, d: string): Promise<Reserva[]> {
    const fecha = f;
    const disponible = d;
    return this.http.get<Reserva[]>("http://181.123.243.5:8080/stock-pwfe/persona/"+id+"/agenda", {params:{fecha, disponible}}).toPromise();
  }

  async getAgendasSinDisponible(id: number, f: string): Promise<Reserva[]> {
    const fecha = f;
    return this.http.get<Reserva[]>("http://181.123.243.5:8080/stock-pwfe/persona/"+id+"/agenda", {params:{fecha}}).toPromise();
  }


  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  async postReservas(body: any): Promise<Reserva>{
    return this.http.post<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }


  async deleteReserva(idCat: number): Promise<{}>{
    return this.http.delete(this.api+'/'+idCat).toPromise();
  }

  getReserva(id: number): Observable<Reserva>{
    return this.http.get<Reserva>(this.api+'/'+id);
  }

  putReserva(body: any): Observable<Reserva>{
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }

  async putReservaCancelar(body: any): Promise<Reserva>{
    console.log(body);
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }
  async putReservaAsistio(body: any): Promise<Reserva>{
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }

  putReservaObservacion(body: any): Observable<Reserva>{
    console.log(body);
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }



}
