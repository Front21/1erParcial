// app.routing.ts

import { RouterModule } from "@angular/router";
import { HorarioexcepcionComponent } from "./horarioexcepcion.component";



const appRoutes = [
  { path: "horarioexcepcion", component: HorarioexcepcionComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);