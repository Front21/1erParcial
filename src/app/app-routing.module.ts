import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaComponent } from './ficha/ficha.component';
import { AgregarfichaComponent } from './agregarficha/agregarficha.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AgregarcategoriaComponent } from './categoria/agregarcategoria/agregarcategoria.component';
import { EliminarcategoriaComponent } from './categoria/eliminarcategoria/eliminarcategoria.component';
import { EditarcategoriaComponent } from './categoria/editarcategoria/editarcategoria.component';
import { EditarfichaComponent } from './ficha/editarficha/editarficha.component';
import { EliminarfichaComponent } from './ficha/eliminarficha/eliminarficha.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { AgregarsubcategoriaComponent } from './subcategoria/agregarsubcategoria/agregarsubcategoria.component';


const routes: Routes = [
  {
    path:'ficha',
    component:FichaComponent
  },
  {path:'agregarficha',
  component:AgregarfichaComponent
  },
  {path:'editarficha',
  component:EditarfichaComponent
  },
  {path:'eliminarficha',
  component:EliminarfichaComponent
  },
  {path:'categoria',
  component:CategoriaComponent
  },
  {path:'agregarcategoria',
  component:AgregarcategoriaComponent
  },
  {path:'eliminarcategoria',
  component:EliminarcategoriaComponent
  },
  {path:'editarcategoria',
  component:EditarcategoriaComponent
  },
  {path:'subcategoria',
  component:SubcategoriaComponent
  },
  {path:'agregarsubcategoria',
  component:AgregarsubcategoriaComponent
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
