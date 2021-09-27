// app.routing.ts

import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";



const appRoutes = [
  { path: "login", component: LoginComponent, pathMatch: "full" }
];
export const routing = RouterModule.forRoot(appRoutes);