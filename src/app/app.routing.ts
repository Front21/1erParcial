// app.routing.ts

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";


const appRoutes = [
  { path: "login", component: LoginComponent, redirectTo: 'login',pathMatch: "full" },

];
export const routing = RouterModule.forRoot(appRoutes);