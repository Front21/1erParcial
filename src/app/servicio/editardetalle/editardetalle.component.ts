import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {Detalle} from "../../model/detalle";
import {ServicefichaService} from "../../service/serviceficha.service";
import {Ficha} from "../../model/ficha";
import {Servicio} from "../../model/servicio";
import {SubCategoria} from "../../model/subcategoria";
import {PresentacionProducto} from "../../model/presentacionproducto";
import {PresentacionproductoService} from "../../service/presentacionproducto.service";
import {ExistenciaProducto} from "../../model/existenciaProducto";

@Component({
  selector: 'app-editardetalle',
  templateUrl: './editardetalle.component.html',
  styleUrls: ['./editardetalle.component.css']
})
export class EditardetalleComponent implements OnInit {

  idServicio: number = 0;
  idDetalle: number = 0;
  detalle: Detalle = new Detalle();
  ficha: Ficha = new Ficha();
  servicio: Servicio = new Servicio();
  presentaciones: PresentacionProducto[] = [];
  presentacionSelec: PresentacionProducto = new PresentacionProducto();
  precioSelec: number = 0;
  cantidadSelec: number = 0;

  constructor(private route: ActivatedRoute,
              private serviceServicio: ServiceservicioService,
              private servicioFicha: ServicefichaService,
              private servicioPresentacion: PresentacionproductoService) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.idServicio = params['idServicio'];})
    this.route.queryParams.subscribe(params => {this.idDetalle = params['idDetalle'];})

    console.log('s '+this.idServicio+' d '+this.idDetalle);

    await this.serviceServicio.getDetalle(this.idServicio, this.idDetalle).then(
      entity => {this.detalle = entity},

      error =>console.log('No se pudo acceder al Detalle')
    );

    console.log('DETALLE '+this.detalle.idServicioDetalle);

    await this.servicioPresentacion.getPresentacionProductoSubCategoria(this.detalle.idPresentacionProducto.idTipoProducto.idTipoProducto).then(
      entity => {this.presentaciones = entity.lista},
      error =>console.log('No se pudo acceder al Detalle')
    );

    for(var presentacion in this.presentaciones){
      if(this.presentaciones[presentacion].idPresentacionProducto == this.detalle.idPresentacionProducto.idPresentacionProducto){
        this.presentacionSelec = this.presentaciones[presentacion];
      }
    }
    //this.precioSelec = this.presentacionSelec.existenciaProducto.precioVenta;

    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    console.log('presSelec '+this.presentacionSelec.idPresentacionProducto);
    console.log('precSelec '+this.precioSelec);
    await this.serviceServicio.getServicio(this.idServicio).then(
      entity => {this.servicio = entity},
      error => console.log('No se pudo acceder al servicio')
    );

    console.log('SERVICIO '+this.servicio.idServicio);

    await this.servicioFicha.getFicha(this.servicio.idFichaClinica.idFichaClinica).then(
      entity => {this.ficha = entity},
      error => console.log('No se pudo acceder al servicio')
    );

    this.servicioPresentacion.getPresentacionProductoSubCategoria(this.detalle.idPresentacionProducto.idTipoProducto.idTipoProducto).then(
      entity => this.presentaciones = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Presentacion Producto')
    );
  }

  onChangePresentacion(nuevoSelect: PresentacionProducto): void{
    this.precioSelec = nuevoSelect.existenciaProducto.precioVenta;
  }

  confirmar(): void{

  }

}
