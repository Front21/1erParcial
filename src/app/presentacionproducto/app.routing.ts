// app.routing.ts

import { RouterModule } from "@angular/router";
import { PresentacionproductoComponent } from "./presentacionproducto.component";


const appRoutes = [
  { path: "presentacionproducto", component: PresentacionproductoComponent, pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);