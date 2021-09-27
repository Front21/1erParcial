import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { Categoria } from '../model/categoria';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriaService {
  status: string="";
  private api: string ="http://181.123.243.5:8080/stock-pwfe/categoria";

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.api);
  }

  getCategoriasP(params: any): Observable<listadatos<Categoria>> {
    return this.http.get<listadatos<Categoria>>(this.api, {params:params});
  }

  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  async postCategorias(body: any): Promise<Categoria>{
    return this.http.post<Categoria>(this.api, body,{headers: this.headers}).toPromise();
  }
  async deleteCategoria(id: number): Promise<{}>{
    return this.http.delete(this.api+'/'+id).toPromise();
  }

  getCategoria(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.api+'/'+id);
  }

  async putCategoria(body:any):Promise<Categoria>{
    console.log(body);
    return this.http.put<Categoria>(this.api,body,{headers:this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('editado '+data),
        error => console.log("error: "+error)
      )
    ).toPromise();
  }



}
