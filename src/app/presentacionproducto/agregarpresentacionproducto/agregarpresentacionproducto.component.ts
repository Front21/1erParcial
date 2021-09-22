import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExistenciaProducto } from 'src/app/model/existenciaProducto';
import { PresentacionProducto } from 'src/app/model/presentacionproducto';
import { Producto } from 'src/app/model/producto';
import { SubCategoria } from 'src/app/model/subcategoria';
import { PresentacionproductoService } from 'src/app/service/presentacionproducto.service';
import { ServicesubcategoriaService } from 'src/app/service/servicesubcategoria.service';

@Component({
  selector: 'app-agregarpresentacionproducto',
  templateUrl: './agregarpresentacionproducto.component.html',
  styleUrls: ['./agregarpresentacionproducto.component.css']
})
export class AgregarpresentacionproductoComponent implements OnInit {

  nuevaPresentacion: PresentacionProducto= new PresentacionProducto();
  idProductoSelec: Producto= new Producto();
  nombreSelec: string="";
  descripcionSelec: string="";
  productos: Producto[]=[];
  existenciaProductos: ExistenciaProducto[]=[];
  codigoSelec: string="";
  flagServicioSelec: string="";
  mensaje: string="";
  existenciaSelec: ExistenciaProducto= new ExistenciaProducto();
  subcategorias: SubCategoria[]=[];
  idSubcategoriaSelec: SubCategoria= new SubCategoria();
  precioVentaSelec: number=0;

  constructor(private servicioPesentacionP: PresentacionproductoService, private router: Router, private servicioSubcategoria: ServicesubcategoriaService) { }

  ngOnInit(): void {

    this.servicioPesentacionP.getProductos().subscribe(
      entity => this.productos = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Productos')
    );

    //this.servicioPesentacionP.getExistenciaproductos().subscribe(
      //entity => this.existenciaProductos = entity.lista,
      //error =>console.log('No se pudo acceder a la lista de Existencia de Productos')

    //;
    //console.log(this.existenciaProductos)
    //console.log(this.existenciaSelec)

  }


   crearPresentacionProducto(): void{
    console.log(this.codigoSelec)
    console.log(this.precioVentaSelec)

    this.nuevaPresentacion.codigo= this.codigoSelec;
    this.nuevaPresentacion.flagServicio= this.flagServicioSelec;
    this.nuevaPresentacion.idProducto= this.idProductoSelec;
    this.nuevaPresentacion.nombre=this.nombreSelec;
    this.nuevaPresentacion.descripcion=this.descripcionSelec;
    this.nuevaPresentacion.existenciaProducto= new ExistenciaProducto();
    this.nuevaPresentacion.existenciaProducto.precioVenta= this.precioVentaSelec;
    
   
    this.servicioPesentacionP.postPresentacionProductos({
      codigo: this.codigoSelec,
      flagServicio:this.flagServicioSelec,
      idProducto: 
      {idProducto: this.idProductoSelec.idProducto},
      nombre: this.nombreSelec,
      existenciaProducto:
      {precioVenta: this.precioVentaSelec}
    }).subscribe(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    //await this.irPresentacionProductos();
  }

  async irPresentacionProductos(): Promise<boolean>{
    return this.router.navigateByUrl('presentacionProducto');
  }
}
