
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../model/persona';
import { ServiceloginService } from '../service/servicelogin.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: '../../login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  usuarioLoginSelec: string = '';
  password: string = '';
  usuarios: Persona[]=[];

  constructor(private router: Router, private serviceLogin: ServiceloginService) {
    
  }

  ngOnInit(){
    this.serviceLogin.getUsuarios().subscribe(
      entity => this.usuarios = entity.lista,
      error =>console.log('No se pudo acceder a la lista de Usuarios')
    );

  }

  login() {
    const usuario = this.usuarios.find((item)=> item.usuarioLogin == this.usuarioLoginSelec);
    console.log(usuario);

    if(usuario){
      this.router.navigate(["/"]);
    }else{
      swal.fire({
        title:"Error",
        text: "Verifique sus Datos Nuevamente",
        icon: "error",
        customClass:{
          confirmButton: "btn btn-info",
        },
        buttonsStyling: false,
      });
    }

  }
}

