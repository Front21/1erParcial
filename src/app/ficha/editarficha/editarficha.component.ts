import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Ficha } from 'src/app/model/ficha';
import { ServicefichaService } from 'src/app/service/serviceficha.service';

@Component({
  selector: 'app-editarficha',
  templateUrl: './editarficha.component.html',
  styleUrls: ['./editarficha.component.css']
})
export class EditarfichaComponent implements OnInit {

  descripcionSelec:  string = "";
  id: number=0;
  ficha: Ficha = new Ficha();
  mensaje: string = "";
  constructor(private route: ActivatedRoute, private servicioFicha: ServicefichaService,
              private router: Router) { }

  ngOnInit(): void {

  this.route.queryParams.subscribe(params => {this.id = params['id'];});
  this.servicioFicha.getFicha(this.id).then(
    entity => {this.ficha.idFichaClinica = entity.idFichaClinica,
      this.ficha.motivoConsulta = entity.motivoConsulta,
      this.ficha.diagnostico = entity.diagnostico,
      this.ficha.observacion = entity.observacion,
      this.ficha.idEmpleado = entity.idEmpleado,
      this.ficha.idCliente = entity.idCliente,
      this.ficha.idTipoProducto = entity.idTipoProducto},
    error => console.log('No se pudo acceder a la Ficha')
  );

  }
  async editarFicha(): Promise<void>{
    console.log(this.ficha.idFichaClinica)
    console.log(this.ficha.motivoConsulta)
    console.log(this.ficha.diagnostico)
    console.log(this.ficha.observacion)
    console.log(this.ficha.idEmpleado.idPersona)
    console.log(this.ficha.idCliente.idPersona)
    console.log(this.ficha.idTipoProducto.idTipoProducto)

    await this.servicioFicha.putFicha({
      idFichaClinica : this.ficha.idFichaClinica,
      observacion : this.ficha.observacion}).then(
       () => {this.mensaje='Editado exitosamente'},error => console.log("error: "+error));
    await this.irListadoReservas();

  }

  async irListadoReservas(): Promise<boolean>{
    return this.router.navigateByUrl('ficha');
  }

}
