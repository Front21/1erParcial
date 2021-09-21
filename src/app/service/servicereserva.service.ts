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
  
  constructor(private http: HttpClient) { }

  getReservas(): Observable<listadatos<Reserva>> {
    return this.http.get<listadatos<Reserva>>(this.api);
  }

  getReservaEmpleados(idP:number): Observable<listadatos<Reserva>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}});
  }
  getReservaEmpleadosenCrear(idP:number,fechadesdeSelec: string): Observable<listadatos<Reserva>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      },
      fechaDesdeCadena:fechadesdeSelec
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}});
  }

  getReservaClientes(idCL:number): Observable<listadatos<Reserva>> {
    const filtro = {
      idCliente: {
        idPersona : idCL
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}});
  }
  getReservaFechas(fd:string, ff:string): Observable<listadatos<Reserva>> {
    const filtro = {
      fechaDesdeCadena: fd,
      fechaHastaCadena: ff
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Reserva>>(this.api, {params:{ejemplo}});
  }

  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  postReservas(body: any): Observable<Reserva>{
    return this.http.post<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  
 
  deleteReserva(idCat: number): Observable<{}>{
    this.api = `${this.api}/${idCat}`;
    return this.http.delete(this.api);
  }

  getReserva(id: number): Observable<Reserva>{
    this.api = `${this.api}/${id}`;
    return this.http.get<Reserva>(this.api);
  }
 
  putReserva(body: any): Observable<Reserva>{
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }

  putReservaCancelar(body: any): Observable<Reserva>{
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  putReservaAsistio(body: any): Observable<Reserva>{
    return this.http.put<Reserva>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }

}
