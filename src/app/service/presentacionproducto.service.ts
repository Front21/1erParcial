
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

  getPresentacionProductos(): Promise<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.api).toPromise();
  }

  async getPresentacionProductosP(paramas: any): Promise<listadatos<PresentacionProducto>> {
    return this.http.get<listadatos<PresentacionProducto>>(this.api, {params: paramas}).toPromise();
  }

  async getPresentacion(idP: number): Promise<PresentacionProducto> {
    return this.http.get<PresentacionProducto>(this.api+'/'+idP).toPromise();
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

  async getPresentacionProductoSubCategoria(idP:number): Promise<listadatos<PresentacionProducto>> {
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

  async getPresentacionProductoSubCategoria2(nameP:string): Promise<listadatos<PresentacionProducto>> {
    const filtro = {
      nombre: nameP

    }
    const ejemplo = JSON.stringify(filtro)
    return this.http.get<listadatos<PresentacionProducto>>(this.api, {params:{ejemplo}}).toPromise();
  }




  getsubcategorias(): Observable<listadatos<SubCategoria>> {
    return this.http.get<listadatos<SubCategoria>>(this.api);
  }


}
