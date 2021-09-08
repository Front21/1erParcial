import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './ficha/ficha.component';

const routes: Routes = [
  {
    path:'ficha',
    component:FichaComponent
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
