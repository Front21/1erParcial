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

@NgModule({
  declarations: [
    AppComponent,
    FichaComponent,
    AgregarfichaComponent,
    CategoriaComponent
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
