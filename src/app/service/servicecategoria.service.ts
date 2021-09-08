import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/categoria";
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.api);
  }
}