import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './ficha/ficha.component';
import { AgregarfichaComponent } from './agregarficha/agregarficha.component';
import { CategoriaComponent } from './categoria/categoria.component';


const routes: Routes = [
  {
    path:'ficha',
    component:FichaComponent
  },
  {path:'agregarficha',
  component:AgregarfichaComponent
  },
  {path:'categoria',
  component:CategoriaComponent
  },
   /**  {
      //path:'nuevopais',
      //component:PaisAgregarComponent
    }*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
