
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { PresentacionProducto } from '../model/presentacionproducto';
import { tap } from 'rxjs/operators';
import { SubCategoria } from '../model/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class PresentacionproductoService {
  status: string="";
  private api: string ="http://181.123.243.5:8080/stock-pwfe/presentacionProducto";
  
  constructor(private http: HttpClient) {}

  getPresentacionProductos(): Observable<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.api);
  }

  headers = new HttpHeaders({ "Content-Type": "application/json" , "usuario": "usuario2" });
  postPresentacionProductos(body: any): Observable<PresentacionProducto>{
    return this.http.post<PresentacionProducto>(this.api, body,{headers: this.headers}).pipe(
      tap( // Log the result or error
        data => console.log('agregado '+data),
        error => console.log("error: "+error)
      )
    );
  }
  
  getPresentacionProducto(idP:number): Observable<PresentacionProducto> {
    const filtro = {
      idProducto: {
        idTipoProducto : {
          idTipoProducto: idP
        }
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<PresentacionProducto>(this.api, {params:{ejemplo}});
  }

  getsubcategorias(): Observable<listadatos<SubCategoria>> {
    return this.http.get<listadatos<SubCategoria>>(this.api);
  }
 

}
