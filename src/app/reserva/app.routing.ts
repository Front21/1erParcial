// app.routing.ts

import { RouterModule } from "@angular/router";
import { ReservaComponent } from "./reserva.component";



const appRoutes = [
  { path: "reserva", component: ReservaComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);