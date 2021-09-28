import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Ng2ModalWindow } from 'ng2-modal-module';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceempleadoService } from '../service/serviceempleado.service';
import { Persona } from '../model/persona';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
 
})
export class PopupComponent {
  modalId: string = 'modalId';
  empleados: Persona[]=[];
  direccion: string = "";

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private servicioEmpleado: ServiceempleadoService) { }

  

  ngOnInit(): void {
    this.servicioEmpleado.getEmpleados().subscribe(
      entity => this.empleados = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Empleados')
    );


    if(this.data.direccion =='horarioexcepcion'){
      this.direccion ="/"+"horarioexcepcion";
      
    }
    if(this.data.direccion =='personahorarioagenda'){
      this.direccion ="/"+"personahorarioagenda";
    }
    if(this.data.direccion =='reportedetallado'){
      this.direccion ="/"+"reportedetallado";
    }
    if(this.data.direccion =='reporteresumido'){
      this.direccion ="/"+"reporteresumido";
    }
    if(this.data.direccion =='ficha'){
      this.direccion ="/"+"ficha";
    }
    if(this.data.direccion =='reserva'){
      this.direccion ="/"+"reserva";
    }
    if(this.data.direccion =='servicio'){
      this.direccion ="/"+"servicio";
    }



  }

  onClickNO(): void{
    this.dialogRef.close();

  }

 
  

}