import { Component, OnInit } from '@angular/core';
import { PresentacionproductoService} from '../service/presentacionproducto.service'
import { PresentacionProducto } from '../model/presentacionproducto';
import { ActivatedRoute } from '@angular/router';
import { SubCategoria } from '../model/subcategoria';
import { ServicesubcategoriaService } from '../service/servicesubcategoria.service';
import {Sort} from "@angular/material/sort";


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
  presentaciondeProductosResultadosSubCategoria: PresentacionProducto [] = [];
  presentaciondeProductosResultadosNombre: PresentacionProducto [] = [];
  presentaciondeProductosResultados: PresentacionProducto [] = [];
  nombres: string[]=[];
  nombreSelect: any;
  band: boolean=false;
  band2: boolean=false;
  clickBuscar: boolean = false;
  public page: number =1;


  constructor(private servicioPresentacionproducto: PresentacionproductoService, private route: ActivatedRoute, private servicioSubCategoria: ServicesubcategoriaService) { }

  async ngOnInit(): Promise<void>{
      await this.servicioPresentacionproducto.getPresentacionProductosP({
        orderBy: "idPresentacionProducto",
        orderDir: "asc",
        like: "S"
      }).then(
        entity => this.listaPresentacion = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );

      this.servicioSubCategoria.getSubCategoriasP({
        orderBy: "idTipoProducto",
        orderDir: "asc",
        like: "S"
      }).subscribe(
        entity => this.subcategorias = entity.lista,
        error =>console.log('No se pudo acceder a la lista de Categorias')
      );

      for (var servicio in this.listaPresentacion){
        if (this.nombres.includes( this.listaPresentacion[servicio].nombre )==false){
          this.nombres[servicio]=this.listaPresentacion[servicio].nombre;
        }
      }
  }

 async Buscar(active: string, direction: string, desdeSort: boolean): Promise<void>{

    if(!desdeSort){
      this.clickBuscar = true;
    }

    let params;
    let ejemplo;
    if(this.subCategoriaSelec.idTipoProducto != undefined && this.nombreSelect != undefined){
      ejemplo = {
        idProducto: {
          idTipoProducto : {
            idTipoProducto: this.subCategoriaSelec.idTipoProducto
          }
        },
        nombre: this.nombreSelect
      }
    }


   if(this.subCategoriaSelec.idTipoProducto == undefined && this.nombreSelect != undefined){
     ejemplo = {
       nombre: this.nombreSelect
     }
   }

   if(this.subCategoriaSelec.idTipoProducto != undefined && this.nombreSelect == undefined){
     ejemplo = {
       idProducto: {
         idTipoProducto : {
           idTipoProducto: this.subCategoriaSelec.idTipoProducto
         }
       }
     }
   }

   if(this.subCategoriaSelec.idTipoProducto == undefined && this.nombreSelect == undefined && this.clickBuscar == true){
     this.mensaje = "Es necesario marcar opciones de busqueda."
   }else{
     if(this.clickBuscar){
       params = {
         orderBy: active,
         orderDir: direction,
         like: "S",
         ejemplo: JSON.stringify(ejemplo)
       }
     }else{
       console.log("ACA DEBO ENTRAR");
       params = {
         orderBy: active,
         orderDir: direction,
         like: "S",
       }
     }

     this.presentaciondeProductosResultados = [];
     console.log(params);
     await this.servicioPresentacionproducto.getPresentacionProductosP(params).then(
       entity => {this.listaPresentacion = entity.lista
       console.log("Resultado Actualziado")},
       error =>console.log('No se pudo acceder a la lista de Categorias')
     );
   }

  }

  async sortData(sort: Sort): Promise<void> {
    console.log(sort.active);
    console.log(sort.direction);
    this.Buscar(sort.active, sort.direction, true);
  }

  async Limpiar(): Promise<void>{
    this.clickBuscar = true;

    await this.servicioPresentacionproducto.getPresentacionProductosP({
      orderBy: "idPresentacionProducto",
      orderDir: "asc",
      like: "S"
    }).then(
      entity => this.listaPresentacion = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Categorias')
    );
  }



  //ejemplo




  //ejemplo



































}


