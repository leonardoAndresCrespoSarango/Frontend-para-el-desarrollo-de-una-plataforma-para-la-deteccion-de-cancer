import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";
import { AsyncPipe, NgIf } from "@angular/common";

/**
 * Componente de carga (Loader) que muestra un indicador cuando una operación está en curso.
 * Se basa en un servicio observable (`LoaderService`) para mostrar u ocultar el indicador de carga.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  /**
   * Observable que indica si se debe mostrar el loader.
   * Se suscribe al servicio `LoaderService`.
   */
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

  /**
   * Constructor del componente.
   * @param loaderService Servicio que maneja el estado de carga global.
   */
  constructor(private loaderService: LoaderService) {}
}
