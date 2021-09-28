import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresentacionProducto } from 'src/app/model/presentacionproducto';
import { Producto } from 'src/app/model/producto';
import { PresentacionproductoService } from 'src/app/service/presentacionproducto.service';

@Component({
  selector: 'app-editarpresentacionproducto',
  templateUrl: './editarpresentacionproducto.component.html',
  styleUrls: ['./editarpresentacionproducto.component.css']
})
export class EditarpresentacionproductoComponent implements OnInit {
  id:number=0;
  preproducto: PresentacionProducto = new PresentacionProducto;
  mensaje: string ="";
  codigoSelec : number = 0;
  flagServicioSelec: string = "";
  idProductoSelec: Producto = new Producto();
  nombreSelec: string = "";
  precioVentaSelec: number = 0;
  productos : Producto [] = [];
  precioVenta: number =0;


  constructor(private servicioPresentacion: PresentacionproductoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {this.id = params['id'];});
    this.route.queryParams.subscribe(params => {this.precioVenta = params['precioVenta'];});
    console.log("Precio" + this.precioVenta);

    this.servicioPresentacion.getPresentacionProducto(this.id).subscribe(
      entity => {this.preproducto.idPresentacionProducto = entity.idPresentacionProducto, 
        this.preproducto.codigo = entity.codigo,
        this.preproducto.flagServicio = entity.flagServicio,
        this.preproducto.idProducto = entity.idProducto,
        this.preproducto.idTipoProducto = entity.idTipoProducto,
        this.preproducto.nombre = entity.nombre
        //this.preproducto.existenciaProducto.precioVenta = 
      },
      error => console.log('No se pudo acceder a la Ficha')
    );

  }

  editarpresentacionproducto(): void{
    this.servicioPresentacion.putPresentacionProducto({
        idPresentacionProducto: this.preproducto.idPresentacionProducto,
        codigo: this.preproducto.codigo,
        flagServicio: this.preproducto.flagServicio,
        idProducto: {
          idProducto: this.preproducto.idProducto.idProducto
        },
        nombre: this.preproducto.nombre,
        existenciaProducto: {
          precioVenta: this.precioVenta
        }
    }).subscribe(()=> {this.mensaje='editado exitosamente'}, error=> console.log("error: " + error));
    
  }

}