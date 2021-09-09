import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { SubCategoria } from '../model/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class ServicesubcategoriaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/tipoProducto";
  constructor(private http: HttpClient) {}

  getSubCategorias(): Observable<listadatos<SubCategoria>> {
    return this.http.get<listadatos<SubCategoria>>(this.api);
  }
}
