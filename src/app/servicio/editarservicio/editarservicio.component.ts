import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiceservicioService} from "../../service/serviceservicio.service";
import {Servicio} from "../../model/servicio";
import {Ficha} from "../../model/ficha";
import {ServicefichaService} from "../../service/serviceficha.service";
import {Categoria} from "../../model/categoria";
import {Persona} from "../../model/persona";
import {SubCategoria} from "../../model/subcategoria";

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
  constructor(private route: ActivatedRoute,
              private servicioServicio: ServiceservicioService,
              private servicioFicha: ServicefichaService) { }

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

    this.servicioFicha.getFicha(this.servicio.idFichaClinica.idFichaClinica).subscribe(
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

    /*
    this.servicioServicio.getDetalles(this.id).then(
      entity => {this.servicio.idServicio = entity.idServicio,
        this.servicio.idFichaClinica = entity.idFichaClinica,
        this.servicio.observacion = entity.observacion},
      error => console.log('No se pudo acceder al servicio')
    );
    */
     
  }
/*
  onChangeCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    this.serviciosubcategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

  onChangeSubCategoria(nuevoSelect: Categoria): void{
    //this.subcategorias = [];
    this.serviciosubcategoria.getSubcategoriasCategoria(nuevoSelect.idCategoria).subscribe(
      entity => this.subcategorias = entity.lista,
      error =>console.log('No se pudo acceder a la lista de SubCategorias')
    );
  }

 */
}
