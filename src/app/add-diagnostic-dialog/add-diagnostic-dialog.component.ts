import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalReportService } from "../services/medical-resport-service.service";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Componente para agregar un diagnóstico médico a un paciente.
 * Permite subir archivos, generar gráficas y guardar diagnósticos en la base de datos.
 */
@Component({
  selector: 'app-add-diagnostic-dialog',
  templateUrl: './add-diagnostic-dialog.component.html',
})
export class AddDiagnosticDialogComponent implements OnInit {
  /** Formulario para agregar diagnóstico */
  addDiagnosticForm: FormGroup;

  /** URL del PDF generado */
  pdfUrl: string | null = null;

  /** Archivos seleccionados para carga */
  selectedFiles: FileList | null = null;

  /** URL segura de la gráfica 6 */
  htmlUrl6: SafeResourceUrl | null = null;

  /** URL segura de la gráfica 3D */
  htmlUrl3D: SafeResourceUrl | null = null;

  /** Estado de colapso del dashboard */
  isCollapsed: boolean = false;

  /** Indica si la gráfica 6 ha sido cargada */
  isGraph6Loaded: boolean = false;

  /** Indica si la gráfica 3D ha sido cargada */
  isGraph3DLoaded: boolean = false;

  /** Gráfica seleccionada en el menú */
  selectedGraph: string = '';

  /** Opciones de gráficas disponibles */
  graphOptions = [
    { value: 'graph6', viewValue: 'Visualización Interactiva de Modalidades' },
    { value: 'graph3D', viewValue: 'Visualización Cerebral 3D' }
  ];

  /**
   * Constructor del componente
   * @param toastr Servicio de notificaciones
   * @param route Servicio para obtener parámetros de la URL
   * @param http Cliente HTTP para peticiones
   * @param fb FormBuilder para la gestión de formularios
   * @param sanitizer Servicio para sanitizar URLs
   * @param medicalReportService Servicio para manejar reportes médicos
   * @param router Router para navegación entre páginas
   */
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private medicalReportService: MedicalReportService,
    private router: Router
  ) {
    this.addDiagnosticForm = this.fb.group({
      patient_id: ['', Validators.required],
      cancer_status: [null, Validators.required],
      description: ['', Validators.required]
    });
  }

  /**
   * Inicializa el componente y obtiene el ID del paciente desde la URL.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const patientId = params['patient_id'];
      if (patientId) {
        this.addDiagnosticForm.patchValue({ patient_id: patientId });
      } else {
        this.toastr.error('El ID del paciente no está disponible.', 'Error');
      }
    });
  }

  /**
   * Maneja la selección de archivos y los sube al servidor.
   * @param event Evento de cambio en el input de archivos
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }

    if (this.selectedFiles) {
      const formData = new FormData();
      const patientIdControl = this.addDiagnosticForm.get('patient_id');

      if (patientIdControl && patientIdControl.value) {
        formData.append('patient_id', patientIdControl.value);
      } else {
        this.toastr.error('El ID del paciente es obligatorio', 'Error');
        return;
      }

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.medicalReportService.uploadFiles(formData).subscribe(
        (response) => {
          this.toastr.success('Archivos subidos correctamente', 'Éxito');
          this.loadGraphs(patientIdControl.value);
        },
        (error) => {
          this.toastr.error('Error subiendo los archivos', 'Error');
        }
      );
    }
  }

  /**
   * Carga las gráficas de predicción después de subir los archivos.
   * @param patientId ID del paciente para generar las gráficas
   */
  loadGraphs(patientId: string): void {
    this.isGraph6Loaded = false;
    this.isGraph3DLoaded = false;

    // Generar gráfica 6
    this.medicalReportService.predict6(patientId).subscribe(
      (graphResponse) => {
        if (graphResponse.html_url6) {
          this.htmlUrl6 = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.html_url6);
          this.isGraph6Loaded = true;
          this.toastr.success('Gráfica 6 generada exitosamente', 'Éxito');
        }
      },
      (error) => {
        this.toastr.error('Error generando la gráfica 6', 'Error');
      }
    );

    // Generar gráfica 3D
    this.medicalReportService.predict3D(patientId).subscribe(
      (graphResponse) => {
        if (graphResponse.htmlUrl3D) {
          this.htmlUrl3D = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.htmlUrl3D);
          this.isGraph3DLoaded = true;
          this.toastr.success('Gráfica 3D generada exitosamente', 'Éxito');
        }
      },
      (error) => {
        this.toastr.error('Error generando la gráfica 3D', 'Error');
      }
    );
  }

  /**
   * Guarda el diagnóstico del paciente en la base de datos.
   */
  saveDiagnostic(): void {
    if (this.addDiagnosticForm.valid) {
      const diagnosticData = this.addDiagnosticForm.value;
      const validStatuses = ['cancer detectado', 'no se detecta cancer', 'diagnostico incierto'];

      if (!validStatuses.includes(diagnosticData.cancer_status)) {
        this.toastr.error('Estado inválido para el diagnóstico presuntivo', 'Error');
        return;
      }

      this.medicalReportService.addDiagnostic(diagnosticData).subscribe(
        () => {
          this.toastr.success('Diagnóstico creado exitosamente', 'Éxito');
        },
        (error) => {
          this.toastr.error('Error creando el diagnóstico', 'Error');
        }
      );
    } else {
      this.toastr.warning('Por favor, complete todos los campos', 'Advertencia');
    }
  }

  /**
   * Alterna el estado de visibilidad del dashboard.
   */
  toggleDashboard(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  /**
   * Navega a la sección de UI Components - Chips.
   */
  navigateToChips(): void {
    this.router.navigate(['ui-components/chips']);
  }
}
