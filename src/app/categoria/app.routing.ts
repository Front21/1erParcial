// app.routing.ts

import { RouterModule } from "@angular/router";
import { CategoriaComponent } from "./categoria.component";



const appRoutes = [
  { path: "categoria", component: CategoriaComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(appRoutes);