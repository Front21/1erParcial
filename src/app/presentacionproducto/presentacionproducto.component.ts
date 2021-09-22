import { Component, OnInit } from '@angular/core';
import { PresentacionproductoService} from '../service/presentacionproducto.service'
import { PresentacionProducto } from '../model/presentacionproducto';
import { ActivatedRoute } from '@angular/router';
import { SubCategoria } from '../model/subcategoria';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';


@Component({
  selector: 'app-presentacionproducto',
  templateUrl: './presentacionproducto.component.html',
  styleUrls: ['./presentacionproducto.component.css']
})
export class PresentacionproductoComponent implements OnInit {
  listaPresentacion: PresentacionProducto [] = [];
  presentacionProductoSelec: PresentacionProducto = new PresentacionProducto();
  mensaje: string = "";
  presProductSelec: PresentacionProducto = new PresentacionProducto();
  subCategoriaSelec: SubCategoria = new SubCategoria();
  subCategoriaSelecName: SubCategoria = new SubCategoria();
  id : number = 0;
  subcategorias: SubCategoria [] = [];
  presentaciondeProductosResultados: PresentacionProducto [] = [];
  nombres: string[]=[];
  nombreSelect: string="";


  constructor(private servicioPresentacionproducto: PresentacionproductoService, private route: ActivatedRoute, private servicioSubCategoria: ServicesubcategoriaService) { }

  async ngOnInit(): Promise<void>{
      await this.servicioPresentacionproducto.getPresentacionProductos().then(
        entity => this.listaPresentacion = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
      this.route.queryParams.subscribe(params => {this.id = params['id'];});
     
      this.servicioSubCategoria.getSubCategorias().subscribe(
        entity => this.subcategorias = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    
      for (var servicio in this.listaPresentacion){
        if (this.nombres.includes( this.listaPresentacion[servicio].nombre )==false){
          this.nombres[servicio]=this.listaPresentacion[servicio].nombre;
        }
      }
  }

 async Buscar(): Promise<void>{
    await this.servicioPresentacionproducto.getPresentacionProductoSubCategoria(this.subCategoriaSelec.idTipoProducto).then(
      entity => this.presentaciondeProductosResultados = entity.lista,
      error => console.log('No se pudo acceder a la Categoria')
    
    );

    await this.servicioPresentacionproducto.getPresentacionProductoSubCategoria2(this.nombreSelect).then(
      entity => this.presentaciondeProductosResultados = entity.lista,
      error => console.log('No se pudo acceder a la Categoria')
    
    );

    console.log("cant: " + this.presentaciondeProductosResultados.length);

  }

}


