import {Component, OnInit} from '@angular/core';
import {MedicalReportService} from "../services/medical-resport-service.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DomSanitizer, SafeHtml, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatDialogActions} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";

/**
 * Componente para la comparación de segmentaciones de imágenes médicas.
 * Permite subir archivos, generar gráficas de segmentación y visualizar métricas de evaluación.
 */
@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatButton,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent implements OnInit {
  /** Archivos seleccionados para subir */
  selectedFiles: FileList | null = null;

  /** URL segura de la gráfica de segmentación */
  htmlUrlS: SafeResourceUrl | null = null;

  /** Indica si la gráfica de segmentación ha sido cargada */
  isGraphSLoaded: boolean = false;

  // Variables para almacenar métricas de segmentación
  /** Coeficiente Dice de la segmentación */
  diceCoefficient: number | null = null;

  /** Media del IoU (Intersection over Union) */
  meanIoU: number | null = null;

  /** Distancia de Hausdorff */
  hausdorffDistance: number | null = null;

  /** Informe médico generado */
  medicalReport: SafeHtml | null = null;

  /**
   * Constructor del componente.
   * @param toastr Servicio de notificaciones.
   * @param route Servicio para obtener parámetros de la URL.
   * @param sanitizer Servicio para sanitizar contenido HTML y URLs.
   * @param medicalReportService Servicio para manejar reportes médicos.
   * @param router Router para navegación entre páginas.
   */
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private medicalReportService: MedicalReportService,
    private router: Router
  ) {}

  /**
   * Inicializa el componente obteniendo los parámetros de la URL.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('Parámetros recibidos:', params);
      const patientId = params['patient_id'];
      console.log(patientId);
    });
  }

  /**
   * Maneja la selección de archivos y los envía para su procesamiento.
   * @param event Evento de cambio en el input de archivos.
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }

    // Obtener patientId de los parámetros de la URL
    const patientId = this.route.snapshot.queryParams['patient_id'];
    if (!patientId) {
      this.toastr.error('El ID del paciente no está disponible.', 'Error');
      return;
    }

    if (this.selectedFiles) {
      const formData = new FormData();
      formData.append('patient_id', patientId); // Añadir el patient_id al formulario
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.medicalReportService.uploadFilesSegmentacion(formData).subscribe(
        (response) => {
          this.toastr.success('Archivos subidos correctamente', 'Éxito');
          this.loadGraphs(patientId);
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          this.toastr.error('Error subiendo los archivos', 'Error');
          console.error('Error del servidor:', error);
        }
      );
    }
  }

  /**
   * Carga las gráficas de segmentación y obtiene las métricas de evaluación.
   * @param patientId ID del paciente para generar las gráficas.
   */
  loadGraphs(patientId: string): void {
    this.isGraphSLoaded = false;

    this.medicalReportService.predictSeg(patientId).subscribe(
      (graphResponse) => {
        console.log('Respuesta de la API:', graphResponse);

        // Cargar la gráfica de segmentación
        if (graphResponse.htmlUrlS) {
          this.htmlUrlS = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.htmlUrlS);
          this.isGraphSLoaded = true;
          this.toastr.success('Gráfica de segmentación generada exitosamente', 'Éxito');
        } else {
          this.toastr.warning('No se recibió la URL de la gráfica.', 'Advertencia');
        }

        // Guardar métricas de segmentación
        if (graphResponse.metrics) {
          this.diceCoefficient = graphResponse.metrics["Dice Coefficient"];
          this.meanIoU = graphResponse.metrics["Mean IoU"];
          this.hausdorffDistance = graphResponse.metrics["Hausdorff Distance"];
        }

        // Guardar el informe médico generado
        if (graphResponse.medical_report) {
          this.medicalReport = this.sanitizer.bypassSecurityTrustHtml(
            graphResponse.medical_report
              .replace(/\n/g, '<br>') // Convertir saltos de línea a <br>
              .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Convertir **texto** en <strong>texto</strong>
          );
        }
      },
      (error) => {
        console.error('Error cargando la gráfica:', error);
        this.toastr.error('Error generando la gráfica de segmentación', 'Error');
      }
    );
  }

  /**
   * Navega a la sección de UI Components - Chips.
   */
  navigateToChips(): void {
    this.router.navigate(['ui-components/chips']);
  }
}
