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

  this.clickBuscar = true;


    if(this.subCategoriaSelec.idTipoProducto != undefined){
      await this.servicioPresentacionproducto.getPresentacionProductoSubCategoria(this.subCategoriaSelec.idTipoProducto).then(
        entity => this.presentaciondeProductosResultadosSubCategoria = entity.lista,
        error => console.log('No se pudo acceder a la Categoria')
      );
    }

    console.log('LENGTH SUBCATEGORIA : '+this.presentaciondeProductosResultadosSubCategoria.length);

    if (this.nombreSelect != undefined){
      await this.servicioPresentacionproducto.getPresentacionProductoSubCategoria2(this.nombreSelect).then(
        entity => this.presentaciondeProductosResultadosNombre = entity.lista,
        error => console.log('No se pudo acceder a la Categoria')
      );
    }
    

    console.log('LENGTH Nombre : '+this.presentaciondeProductosResultadosNombre.length);
    console.log('nombreSelect: ' + this.nombreSelect);


    this.presentaciondeProductosResultados = [];
    this.actualizarResultadoFiltro();

  }


  actualizarResultadoFiltro(): void {
    for (var servicio in this.listaPresentacion) {
      this.band2 = false; //criterio: asegura que todas las listas no hayan sido vacias por no seleccionar nada
      if(this.presentaciondeProductosResultadosSubCategoria.length>0){
        this.band2=true;
        this.band=false; //criterio si no se encuentra en una lista cargada, se debe rechazar
          for (var s1 in this.presentaciondeProductosResultadosSubCategoria){
            if(this.listaPresentacion[servicio].idPresentacionProducto==this.presentaciondeProductosResultadosSubCategoria[s1].idPresentacionProducto){
              this.band=true;
              break;
            }
          }
          if(this.band==false){
            console.log("Entra subcategoria");
            continue;
          }
          //this.band = false;
      }else{
        if(this.subCategoriaSelec.idTipoProducto != 0 && this.subCategoriaSelec.idTipoProducto != undefined){
          continue;
        }
      }

      if(this.presentaciondeProductosResultadosNombre.length>0){
        console.log("ENTRO A NOMBRES");
        this.band2=true;
        this.band=false;
        for (var s1 in this.presentaciondeProductosResultadosNombre){
          if(this.listaPresentacion[servicio].idPresentacionProducto==this.presentaciondeProductosResultadosNombre[s1].idPresentacionProducto){
            this.band=true;
            break;
          }
        }
        if(this.band==false){
          continue;
        }
        //this.band = false;
      }else{
        if(this.nombreSelect !="" && this.nombreSelect != undefined){
          continue;
        }
      }

      if(this.band2==true){
        this.presentaciondeProductosResultados.push(this.listaPresentacion[servicio]);
      }
    }

    console.log("tamaño: " + this.presentaciondeProductosResultados.length);
}

  //ejemplo
  



  //ejemplo



































}


