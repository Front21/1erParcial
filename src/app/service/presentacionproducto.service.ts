
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listadatos } from '../model/datos';
import { PresentacionProducto } from '../model/presentacionproducto';
import { tap } from 'rxjs/operators';
import { SubCategoria } from '../model/subcategoria';
import { Producto } from '../model/producto';
import { ExistenciaProducto } from '../model/existenciaProducto';

@Injectable({
  providedIn: 'root'
})
export class PresentacionproductoService {
  status: string="";
  private api: string ="http://181.123.243.5:8080/stock-pwfe/presentacionProducto";
  
  constructor(private http: HttpClient) {}

  getPresentacionProductos(): Promise<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.api).toPromise();
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
  
  getPresentacionProductoSubCategoria(idP:number): Promise<listadatos<PresentacionProducto>> {
    const filtro = {
      idProducto: {
        idTipoProducto : {
          idTipoProducto: idP
        }
      }
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<PresentacionProducto>>(this.api, {params:{ejemplo}}).toPromise();
  }
  
  getPresentacionProductoSubCategoria2(nameP:string): Promise<listadatos<PresentacionProducto>> {
    const filtro = {
      nombre: nameP
      
    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<PresentacionProducto>>(this.api, {params:{ejemplo}}).toPromise();
  }




  getsubcategorias(): Observable<listadatos<SubCategoria>> {
    return this.http.get<listadatos<SubCategoria>>(this.api);
  }

  private api1: string ="http://181.123.243.5:8080/stock-pwfe/producto";
  getProductos(): Observable<listadatos<Producto>> {
    return this.http.get<listadatos<Producto>>(this.api1);
  }
  private api2: string ="http://181.123.243.5:8080/stock-pwfe/existenciaProducto";
  getExistenciaproductos(): Observable<listadatos<ExistenciaProducto>> {
    return this.http.get<listadatos<ExistenciaProducto>>(this.api2);
  }
 

}