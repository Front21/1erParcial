import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichaComponent } from './ficha/ficha.component';
import {HttpClientModule} from '@angular/common/http';
import { ServicefichaService } from './service/serviceficha.service';
import { FormsModule } from '@angular/forms';
import { AgregarfichaComponent } from './agregarficha/agregarficha.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AgregarcategoriaComponent } from './categoria/agregarcategoria/agregarcategoria.component';
import { EliminarcategoriaComponent } from './categoria/eliminarcategoria/eliminarcategoria.component';
import { EditarcategoriaComponent } from './categoria/editarcategoria/editarcategoria.component';
import { EditarfichaComponent } from './ficha/editarficha/editarficha.component';
import { EliminarfichaComponent } from './ficha/eliminarficha/eliminarficha.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import { AgregarsubcategoriaComponent } from './subcategoria/agregarsubcategoria/agregarsubcategoria.component';
import { PersonahorarioagendaComponent } from './personahorarioagenda/personahorarioagenda.component';
import { AgregarpersonahorarioagendaComponent } from './personahorarioagenda/agregarpersonahorarioagenda/agregarpersonahorarioagenda.component';
import { EditarpersonahorarioagendaComponent } from './personahorarioagenda/editarpersonahorarioagenda/editarpersonahorarioagenda.component';
import { EliminarpersonahorarioagendaComponent } from './personahorarioagenda/eliminarpersonahorarioagenda/eliminarpersonahorarioagenda.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AgregarpacienteComponent } from './pacientes/agregarpaciente/agregarpaciente.component';
import { EditarpacienteComponent } from './pacientes/editarpaciente/editarpaciente.component';
import { EliminarpacienteComponent } from './pacientes/eliminarpaciente/eliminarpaciente.component';

@NgModule({
  declarations: [
    AppComponent,
    FichaComponent,
    AgregarfichaComponent,
    CategoriaComponent,
    AgregarcategoriaComponent,
    EliminarcategoriaComponent,
    EditarcategoriaComponent,
    EditarfichaComponent,
    EliminarfichaComponent,
    SubcategoriaComponent,
    AgregarsubcategoriaComponent,
    PersonahorarioagendaComponent,
    AgregarpersonahorarioagendaComponent,
    EditarpersonahorarioagendaComponent,
    EliminarpersonahorarioagendaComponent,
    PacientesComponent,
    AgregarpacienteComponent,
    EditarpacienteComponent,
    EliminarpacienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [ServicefichaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
