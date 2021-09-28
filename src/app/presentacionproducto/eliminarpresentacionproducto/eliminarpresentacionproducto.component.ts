import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentacionproductoService } from 'src/app/service/presentacionproducto.service';

@Component({
  selector: 'app-eliminarpresentacionproducto',
  templateUrl: './eliminarpresentacionproducto.component.html',
  styleUrls: ['./eliminarpresentacionproducto.component.css']
})
export class EliminarpresentacionproductoComponent implements OnInit {
  mensaje: string ="";
  id: number = 0;
  constructor(private route: ActivatedRoute, private servicioPresentacioProducto: PresentacionproductoService, private router: Router,private zone:NgZone) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {this.id = params['id'];})
    await this.eliminarpresentacionproducto();
    this.irListadoPresentacion();
  }

  async irListadoPresentacion(): Promise<boolean>{
    return this.router.navigateByUrl('presentacionproducto');
  }


  async eliminarpresentacionproducto(): Promise<void>{
    await this.servicioPresentacioProducto.deletePresentacionProducto(this.id).then(
      () => {this.mensaje='Eliminado exitosamente'},error => console.log("error: "+error));
  }




  
}
