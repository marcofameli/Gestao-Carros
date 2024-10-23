import {Routes} from '@angular/router';
import {LoginComponent} from './components/layout/login/login.component';
import {PrincipalComponent} from './components/layout/principal/principal.component';
import {CarroslistComponent} from './components/carros/carroslist/carroslist.component';
import {CarrosdetailsComponent} from './components/carros/carrosdetails/carrosdetails.component';

import {MarcasdetailsComponent} from './components/marcas/marcasdetails/marcasdetails.component';
import {MarcaslistComponent} from './components/marcas/marcaslist/marcaslist.component';
import {ProprietarioslistComponent} from './components/proprietarios/proprietarioslist/proprietarioslist.component';
import {loginGuard} from './auth/login.guard';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {
    path: "admin", component: PrincipalComponent, canActivate: [loginGuard], children: [
      {path: "carros", component: CarroslistComponent},
      {path: "carros/new", component: CarrosdetailsComponent},
      {path: "carros/edit/:id", component: CarrosdetailsComponent},
      {path: "marcas", component: MarcaslistComponent},
      {path: "marcas/new", component: MarcasdetailsComponent},
      {path: "marcas/edit/:id", component: MarcasdetailsComponent},
      {path: "proprietarios", component: ProprietarioslistComponent},
      {path: "proprietarios/new", component: ProprietarioslistComponent},
      {path: "proprietarios/edit/:id", component: ProprietarioslistComponent},

    ]}
];
