import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichaComponent } from './ficha/ficha.component';
import {HttpClientModule} from '@angular/common/http';
import { ServicefichaService } from './service/serviceficha.service';
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
import {MatSortModule} from '@angular/material/sort';
import { DetallesComponent } from './servicio/detalles/detalles.component';
import { EliminarservicioComponent } from './servicio/eliminarservicio/eliminarservicio.component';
import { EditardetalleComponent } from './servicio/editardetalle/editardetalle.component';
import { ReporteresumidoComponent } from './reporte/reporteresumido/reporteresumido.component';
import { ReportedetalladoComponent } from './reporte/reportedetallado/reportedetallado.component';
import { LoginComponent } from './login/login.component';
import { PopupComponent } from './popup/popup.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AgregarpacienteComponent } from './pacientes/agregarpaciente/agregarpaciente.component';
import { EditarpacienteComponent } from './pacientes/editarpaciente/editarpaciente.component';
import { EliminarpacienteComponent } from './pacientes/eliminarpaciente/eliminarpaciente.component';
import { EditarpresentacionproductoComponent } from './presentacionproducto/editarpresentacionproducto/editarpresentacionproducto.component';
import { EliminarpresentacionproductoComponent } from './presentacionproducto/eliminarpresentacionproducto/eliminarpresentacionproducto.component';
import { AgregarpresentacionproductoComponent } from './presentacionproducto/agregarpresentacionproducto/agregarpresentacionproducto.component';



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

    DetallesComponent,
    EliminarservicioComponent,
    EditardetalleComponent,
    ReporteresumidoComponent,
    ReportedetalladoComponent,

    LoginComponent,
    PopupComponent,
    PacientesComponent,
    AgregarpacienteComponent,
    EditarpacienteComponent,
    EliminarpacienteComponent,
    EditarpresentacionproductoComponent,
    EliminarpresentacionproductoComponent,
    AgregarpresentacionproductoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,

    BrowserAnimationsModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule


  ],
  providers: [ServicefichaService],
  bootstrap: [AppComponent]
})

export class AppModule { }
