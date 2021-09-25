import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { SubCategoria } from '../model/subcategoria';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesubcategoriaService {
  private api: string ="http://181.123.243.5:8080/stock-pwfe/tipoProducto";
  constructor(private http: HttpClient) {}

  getSubCategorias(): Observable<listadatos<SubCategoria>> {
    return this.http.get<listadatos<SubCategoria>>(this.api);
  }

  headers = new HttpHeaders({ "Content-Type": "application/json", "usuario": "usuario2" });
  async postSubcategorias(body: any): Promise<SubCategoria>{
    return this.http.post<SubCategoria>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }
  

  getSubcategoria(id: number): Observable<SubCategoria>{
    return this.http.get<SubCategoria>(this.api+'/'+id);
  }
 
  putSubcategoria(body: any): Observable<SubCategoria>{
    console.log(body);
    return this.http.put<SubCategoria>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    );
  }

  async deleteSubcategoria(id: number): Promise<{}>{
    return this.http.delete(this.api+'/'+id).toPromise();
  }

}