import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './loader/loader.component';
import { AddPatientDialogComponent } from './add-patient-dialog/add-patient-dialog.component';
import {AddDiagnosticDialogComponent} from "./add-diagnostic-dialog/add-diagnostic-dialog.component";
import {SafePipe} from "./safe.pipe";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import {RefuerzoComponent} from "./pages/refuerzo/refuerzo.component"; // Importa CommonModule

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    AddPatientDialogComponent,
    AddDiagnosticDialogComponent,
    SafePipe// <-- Asegúrate de declarar el componente aquí

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    MatIconModule,




    TablerIconsModule.pick(TablerIcons),
    ToastrModule.forRoot({
      timeOut: 2000, // Duración de la notificación en milisegundos
      positionClass: 'toast-top-right', // Posición de la notificación
      preventDuplicates: true, // Evita notificaciones duplicadas
    }),
    LoaderComponent,
  ],
    exports: [TablerIconsModule, SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
