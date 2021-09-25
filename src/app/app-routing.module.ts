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
import {PersonahorarioagendaComponent} from "./personahorarioagenda/personahorarioagenda.component";
import {AgregarpersonahorarioagendaComponent} from "./personahorarioagenda/agregarpersonahorarioagenda/agregarpersonahorarioagenda.component";
import {EditarpersonahorarioagendaComponent} from "./personahorarioagenda/editarpersonahorarioagenda/editarpersonahorarioagenda.component";
import {EliminarpersonahorarioagendaComponent} from "./personahorarioagenda/eliminarpersonahorarioagenda/eliminarpersonahorarioagenda.component";
import { PresentacionproductoComponent } from './presentacionproducto/presentacionproducto.component';
import { HorarioexcepcionComponent } from './horarioexcepcion/horarioexcepcion.component';
import { AgregarhorarioexcepcionComponent } from './horarioexcepcion/agregarhorarioexcepcion/agregarhorarioexcepcion.component';
import { EditarhorarioexcepcionComponent } from './horarioexcepcion/editarhorarioexcepcion/editarhorarioexcepcion.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AgregarreservaComponent } from './reserva/agregarreserva/agregarreserva.component';
import { EditarsubcategoriaComponent } from './subcategoria/editarsubcategoria/editarsubcategoria.component';
import { EliminarsubcategoriaComponent } from './subcategoria/eliminarsubcategoria/eliminarsubcategoria.component';
import { EliminarhorarioexcepcionComponent } from './horarioexcepcion/eliminarhorarioexcepcion/eliminarhorarioexcepcion.component';
import { EditarreservaComponent } from './reserva/editarreserva/editarreserva.component';
import { EliminareservaComponent } from './reserva/eliminareserva/eliminareserva.component';



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
  {path:'editarsubcategoria',
  component:EditarsubcategoriaComponent
  },
  {path:'eliminarsubcategoria',
  component:EliminarsubcategoriaComponent
  },
  {path:'agregarsubcategoria',
  component:AgregarsubcategoriaComponent
  },
  {path:'personahorarioagenda',
    component:PersonahorarioagendaComponent
  },
  {path:'agregarpersonahorarioagenda',
    component:AgregarpersonahorarioagendaComponent
  },
  {path:'editarpersonahorarioagenda',
    component:EditarpersonahorarioagendaComponent
  },
  {path:'eliminarpersonahorarioagenda',
    component:EliminarpersonahorarioagendaComponent
  },
  {path:'horarioexcepcion',
  component:HorarioexcepcionComponent
  },
  {path:'agregarhorarioexcepcion',
  component:AgregarhorarioexcepcionComponent
  },
  {path:'editarhorarioexcepcion',
  component:EditarhorarioexcepcionComponent
  },
  {path:'eliminarhorarioexcepcion',
  component:EliminarhorarioexcepcionComponent
  },
  {path:'reserva',
  component:ReservaComponent
  },
  {path:'agregarreserva',
  component:AgregarreservaComponent
  },
  {path:'editarreserva',
  component:EditarreservaComponent
  },
  {path:'eliminarreserva',
  component:EliminareservaComponent
  },

  {path:'presentacionproducto',
  component:PresentacionproductoComponent
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
