// app.routing.ts

import { RouterModule } from "@angular/router";
import { FichaComponent } from "./ficha.component";


const appRoutes = [
  { path: "", component: FichaComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);