// app.routing.ts

import { RouterModule } from "@angular/router";
import { PersonahorarioagendaComponent } from "./personahorarioagenda.component";



const appRoutes = [
  { path: "personahorarioagenda", component: PersonahorarioagendaComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);