import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Ng2ModalWindow } from 'ng2-modal-module';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  modalId: string = 'modalId';
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  

  ngOnInit(): void {


  }



  onClickNO(): void{
    this.dialogRef.close();

  }


  openDialog(): void{

    const dialogRef = this.dialog.open(PopupComponent,{});
    dialogRef.afterClosed().subscribe(res => {console.log(res);
    });
  }
  
}

