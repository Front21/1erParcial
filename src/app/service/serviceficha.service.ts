import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Ficha } from '../model/ficha';

@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/fichaClinica";


  constructor(private http: HttpClient) {}

  getFichas(): Observable<listadatos<Ficha>> {
    return this.http.get<listadatos<Ficha>>(this.api);
  }

  getFichasCategoria(id:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idTipoProducto: {
        idTipoProducto : id
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
   
}
