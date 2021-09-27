// app.routing.ts

import { RouterModule } from "@angular/router";
import { ServicioComponent } from "./servicio.component";



const appRoutes = [
  { path: "servicio", component: ServicioComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);