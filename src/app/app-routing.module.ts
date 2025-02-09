import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {AppMenuComponent} from "./pages/ui-components/menu/menu.component";
import {AppTooltipsComponent} from "./pages/ui-components/tooltips/tooltips.component";
import {AppSideLoginComponent} from "./pages/authentication/login/login.component";
import {DiagnosticIaComponent} from "./diagnostic-ia/diagnostic-ia.component";
import {AddDiagnosticDialogComponent} from "./add-diagnostic-dialog/add-diagnostic-dialog.component";
import {RefuerzoComponent} from "./pages/refuerzo/refuerzo.component"
import {SurveyDialogComponent} from "./pages/survey-dialog/survey-dialog.component";
import {ComparisonComponent} from "./comparison/comparison.component";
import {HistogramaComponent} from "./pages/histograma/histograma.component";
const routes: Routes = [
  {

    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'histograma', component: HistogramaComponent,
      },


      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },

  {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  { path: 'survey/:patient_id', component: SurveyDialogComponent },  // Ruta que recibe el patientId

  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  { path: 'forgot-password', component: AppMenuComponent },
  { path: 'reset-password/:token', component: AppTooltipsComponent },
  { path: 'diagnostico', component: AddDiagnosticDialogComponent },
  { path: 'comparison', component: ComparisonComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
