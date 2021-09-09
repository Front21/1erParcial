import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Ficha } from '../model/ficha';

@Injectable({
  providedIn: 'root'
})
export class ServicefichaService {
  getFichasSubCategorias(idTipoProducto: number) {
    throw new Error('Method not implemented.');
  }
  private api: string ="http://181.123.243.5:8080/stock-pwfe/fichaClinica";


  constructor(private http: HttpClient) {}

  getFichas(): Observable<listadatos<Ficha>> {
    return this.http.get<listadatos<Ficha>>(this.api);
  }

  getFichasCategoria(idC:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idTipoProducto: {
        idTipoProducto : idC
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
  getFichasSubCategoria(idS:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idTipoProducto: {
        idTipoProducto : idS
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
  getFichasEmpleados(idP:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idEmpleado: {
        idPersona : idP
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }

  getFichasClientes(idCL:number): Observable<listadatos<Ficha>> {
    const filtro = {
      idCliente: {
        idPersona : idCL
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }
  getFichasFechas(fd:string, ff:string): Observable<listadatos<Ficha>> {
    const filtro = {
      fechaDesdeCadena: fd,
      fechaHastaCadena: ff
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<Ficha>>(this.api, {params:{ejemplo}});
  }


}