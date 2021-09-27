import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {Servicio} from "../../model/servicio";
import {Ficha} from "../../model/ficha";
import {ServicefichaService} from "../../service/serviceficha.service";
import {Categoria} from "../../model/categoria";
import {Persona} from "../../model/persona";
import {SubCategoria} from "../../model/subcategoria";
import {Detalle} from "../../model/detalle";
import {ServiceCategoriaService} from "../../service/servicecategoria.service";
import {listadatos} from "../../model/datos";
import {ServicesubcategoriaService} from "../../service/servicesubcategoria.service";
import {PresentacionproductoService} from "../../service/presentacionproducto.service";
import {PresentacionProducto} from "../../model/presentacionproducto";
import {Observable} from "rxjs";

@Component({
  selector: 'app-editarservicio',
  templateUrl: './editarservicio.component.html',
  styleUrls: ['./editarservicio.component.css']
})
export class EditarservicioComponent implements OnInit {

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
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    await this.servicioServicio.getServicio(this.id).then(
      entity => {
        this.servicio.idServicio = entity.idServicio,
          this.servicio.idFichaClinica = entity.idFichaClinica,
          this.servicio.observacion = entity.observacion
      },
      error => console.log('No se pudo acceder al servicio')
    );

    this.ficha.idEmpleado = new Persona();
    this.ficha.idCliente = new Persona();
    this.ficha.idTipoProducto = new SubCategoria();
    this.ficha.idTipoProducto.idCategoria = new Categoria();

    await this.servicioFicha.getFicha(this.servicio.idFichaClinica.idFichaClinica).then(
      entity => {
        this.ficha.idFichaClinica = entity.idFichaClinica,
          this.ficha.fechaHora = entity.fechaHora,
          this.ficha.motivoConsulta = entity.motivoConsulta,
          this.ficha.diagnostico = entity.diagnostico,
          this.ficha.observacion = entity.observacion,
          this.ficha.idEmpleado.idPersona = entity.idEmpleado.idPersona,
          this.ficha.idCliente.idPersona = entity.idCliente.idPersona,
          this.ficha.idTipoProducto = entity.idTipoProducto
      },
      error => console.log('No se pudo acceder al servicio')
    );
    console.log('SERVICIOOOOO OBSER '+this.servicio.observacion);
  }

  async editarServicio(): Promise<void>{
    this.servicioServicio.putServicio({
      idServicio : this.servicio.idServicio,
      observacion : this.servicio.observacion}).subscribe(
      () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));

      await this.irEditarServicio();
  }

  async irEditarServicio(): Promise<boolean>{
    return this.router.navigateByUrl('servicio');
  }

}


