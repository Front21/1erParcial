import { Component, OnInit } from '@angular/core';
import {Persona} from "../../model/persona";
import {SubCategoria} from "../../model/subcategoria";
import {Categoria} from "../../model/categoria";
import {listadatos} from "../../model/datos";
import {PresentacionProducto} from "../../model/presentacionproducto";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {ServicefichaService} from "../../service/serviceficha.service";
import {ServiceCategoriaService} from "../../service/servicecategoria.service";
import {ServicesubcategoriaService} from "../../service/servicesubcategoria.service";
import {PresentacionproductoService} from "../../service/presentacionproducto.service";
import {Servicio} from "../../model/servicio";
import {Ficha} from "../../model/ficha";
import {Detalle} from "../../model/detalle";

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  id: number = 0;
  servicio: Servicio = new Servicio();
  ficha: Ficha = new Ficha();
  categorias: Categoria[] = [];
  categoriaSelec: Categoria = new Categoria();
  subcategorias: SubCategoria[] = [];
  subCategoriaSelec: SubCategoria = new SubCategoria();
  detalles: Detalle[] = [];
  presentaciones: PresentacionProducto[] = [];
  presentacionSelec: PresentacionProducto = new PresentacionProducto();
  precioSelec: number = 0;
  cantidadSelec: number = 0;
  mensaje: string = "";
  mismaPagina: boolean = false;
  constructor(private route: ActivatedRoute,
              private servicioServicio: ServiceservicioService,
              private servicioFicha: ServicefichaService,
              private servicioCategoria: ServiceCategoriaService,
              private servicioSubCategoria: ServicesubcategoriaService,
              private servicioPresentacion: PresentacionproductoService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.id = params['id'];});

    await this.servicioServicio.getServicio(this.id).then(
      entity => {this.servicio.idServicio = entity.idServicio,
        this.servicio.idFichaClinica = entity.idFichaClinica,
        this.servicio.observacion = entity.observacion},
      error => console.log('No se pudo acceder al servicio')
    );

    this.ficha.idEmpleado = new Persona();
    this.ficha.idCliente = new Persona();
    this.ficha.idTipoProducto = new SubCategoria();
    this.ficha.idTipoProducto.idCategoria = new Categoria();

    await this.servicioFicha.getFicha(this.servicio.idFichaClinica.idFichaClinica).then(
      entity => {this.ficha.idFichaClinica = entity.idFichaClinica,
        this.ficha.fechaHora = entity.fechaHora,
        this.ficha.motivoConsulta = entity.motivoConsulta,
        this.ficha.diagnostico = entity.diagnostico,
        this.ficha.observacion = entity.observacion,
        this.ficha.idEmpleado.idPersona = entity.idEmpleado.idPersona,
        this.ficha.idCliente.idPersona = entity.idCliente.idPersona,
        this.ficha.idTipoProducto = entity.idTipoProducto},
      error => console.log('No se pudo acceder al servicio')
    );

    await this.servicioServicio.getDetalles(this.id).then(
      entity => {this.detalles = entity},
      error => console.log('No se pudo acceder al servicio')
    );

    console.log("DETALLES "+this.detalles.length);

    this.servicioCategoria.getCategorias().subscribe(
      entity => {this.categorias = entity.lista},
      error => console.log('No se pudo acceder al servicio')
    );





  }

  onChangeCategoria(nuevoSelect: Categoria): void{
    this.subcategorias = [];
    this.servicioSubCategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      (entity: listadatos<SubCategoria>) => {this.subcategorias = entity.lista},
      (error: any) =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  onChangeSubCategoria(nuevoSelect: SubCategoria): void{
    this.presentaciones = [];
    this.servicioPresentacion.getPresentacionProductoSubCategoria(nuevoSelect.idTipoProducto).then(
      entity => this.presentaciones = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Presentacion Producto')
    );
  }

  onChangePresentacion(nuevoSelect: PresentacionProducto): void{
    this.precioSelec = nuevoSelect.existenciaProducto.precioVenta;
  }

  async agregarDetalle(): Promise<void>{
    await this.servicioServicio.postDetalle({
        cantidad: this.cantidadSelec,
        idPresentacionProducto: {
          idPresentacionProducto: this.presentacionSelec.idPresentacionProducto
        },
        idServicio: {
          idServicio: this.servicio.idServicio
        }
      }, this.servicio.idServicio
    ).then(
      () => {this.mensaje='Agregado exitosamente'},error => console.log("error: "+error));

    await this.irEditarServicio();
  }

  irEditarServicio(): void{
    return window.location.reload();
  }

  async eliminarDetalle(idDetalle: number): Promise<void>{
    await this.servicioServicio.deleteDetalle(this.servicio.idServicio, idDetalle).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
    await this.irEditarServicio();
  }

}
