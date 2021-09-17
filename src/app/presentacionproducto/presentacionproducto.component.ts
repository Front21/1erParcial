import { Component, OnInit } from '@angular/core';
import { PresentacionproductoService} from '../service/presentacionproducto.service'
import { PresentacionProducto } from '../model/presentacionproducto';
import { ActivatedRoute } from '@angular/router';
import { SubCategoria } from '../model/subcategoria';


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
  id : number = 0;
  subcategorias: SubCategoria [] = [];

  constructor(private servicioPresentacionproducto: PresentacionproductoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.servicioPresentacionproducto.getPresentacionProductos().subscribe(
        entity => this.listaPresentacion = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
      this.route.queryParams.subscribe(params => {this.id = params['id'];});
     
      this.servicioPresentacionproducto.getsubcategorias().subscribe(
        entity => this.subcategorias = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );
    
  }

  Buscar(): void{
    this.servicioPresentacionproducto.getPresentacionProducto(this.id).subscribe(
      entity => {this.presentacionProductoSelec.idTipoProducto.idTipoProducto = entity.idTipoProducto.idTipoProducto
      },
      error => console.log('No se pudo acceder a la Categoria')
    );
    
  }

}


