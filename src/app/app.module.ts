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
import { PresentacionproductoComponent } from './presentacionproducto/presentacionproducto.component';
import { HorarioexcepcionComponent } from './horarioexcepcion/horarioexcepcion.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AgregarreservaComponent } from './reserva/agregarreserva/agregarreserva.component';
import { AgregarhorarioexcepcionComponent } from './horarioexcepcion/agregarhorarioexcepcion/agregarhorarioexcepcion.component';
import { EditarhorarioexcepcionComponent } from './horarioexcepcion/editarhorarioexcepcion/editarhorarioexcepcion.component';
import { EditarsubcategoriaComponent } from './subcategoria/editarsubcategoria/editarsubcategoria.component';
import { EliminarsubcategoriaComponent } from './subcategoria/eliminarsubcategoria/eliminarsubcategoria.component';
import { EliminarhorarioexcepcionComponent } from './horarioexcepcion/eliminarhorarioexcepcion/eliminarhorarioexcepcion.component';
import { EditarreservaComponent } from './reserva/editarreserva/editarreserva.component';
import { EliminareservaComponent } from './reserva/eliminareserva/eliminareserva.component';
import { ServicioComponent } from './servicio/servicio.component';
import { AgregarservicioComponent } from './servicio/agregarservicio/agregarservicio.component';
import { EditarservicioComponent } from './servicio/editarservicio/editarservicio.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/Table'

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
    PresentacionproductoComponent,
    HorarioexcepcionComponent,
    ReservaComponent,
    AgregarreservaComponent,
    AgregarhorarioexcepcionComponent,
    EditarhorarioexcepcionComponent,
    EditarsubcategoriaComponent,
    EliminarsubcategoriaComponent,
    EliminarhorarioexcepcionComponent,
    EditarreservaComponent,
    EliminareservaComponent,
    ServicioComponent,
    AgregarservicioComponent,
    EditarservicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, 
    MatTableModule

  ],
  providers: [ServicefichaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
