// app.routing.ts

import { RouterModule } from "@angular/router";
import { SubcategoriaComponent } from "./subcategoria.component";


const appRoutes = [
  { path: "subcategoria", component: SubcategoriaComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(appRoutes);