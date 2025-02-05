import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MedicalReportService } from '../../../services/medical-resport-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import html2canvas from 'html2canvas';

/**
 * Componente para la visualización y gestión de reportes médicos.
 * Permite ver imágenes y reportes médicos, editar diagnósticos, enviar retroalimentación y generar reportes en PDF.
 */
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent implements OnInit {
  /** URLs de las visualizaciones médicas seguras */
  htmlUrl1: SafeResourceUrl | null = null;
  htmlUrl2: SafeResourceUrl | null = null;
  htmlUrl3: SafeResourceUrl | null = null;
  htmlUrl4: SafeResourceUrl | null = null;
  htmlUrl5: SafeResourceUrl | null = null;
  htmlUrl6: SafeResourceUrl | null = null;

  /** Texto del reporte médico */
  reportText2: string | null = null;
  reportText5: string | null = null;

  /** Identificadores del paciente */
  patientId: string | null = null;
  numeroHistoriaClinica: string | null = null;

  /** Formularios para diagnóstico y retroalimentación */
  diagnosticForm: FormGroup;
  feedbackForm: FormGroup;

  /** Estado del diagnóstico */
  diagnosticLoaded = false;

  /** Gráfica seleccionada */
  selectedGraph: string | null = 'graph1';

  /** URL del PDF */
  pdfUrl: string | null = null;

  /** Opciones de visualización de gráficas */
  graphOptions = [
    { value: 'graph1', viewValue: 'Visualización Cerebral 3D' },
    { value: 'graph6', viewValue: 'Visualización Interactiva de Modalidades' }
  ];

  /**
   * Constructor del componente.
   * @param route Servicio para obtener los parámetros de la URL.
   * @param router Servicio de navegación.
   * @param userService Servicio para manejar reportes médicos.
   * @param fb FormBuilder para la creación de formularios.
   * @param toastr Servicio para mostrar notificaciones.
   * @param sanitizer Servicio para sanitizar URLs.
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: MedicalReportService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.diagnosticForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.feedbackForm = this.fb.group({
      iaAccuracy: ['', Validators.required],
      iaUsefulness: ['', Validators.required],
      iaRegions: ['', Validators.required],
      iaComparison: ['', Validators.required],
      iaReliability: ['', Validators.required],
      additionalComments: [''],
      modalitiesDescription: ['', Validators.required]
    });
  }

  /**
   * Inicializa el componente cargando datos de la URL y del paciente.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.htmlUrl1 = this.sanitizeUrl(params.get('html_url1'));
      this.htmlUrl2 = this.sanitizeUrl(params.get('html_url2'));
      this.htmlUrl6 = this.sanitizeUrl(params.get('html_url6'));

      this.reportText2 = params.get('report_text2');
      this.reportText5 = params.get('report_text5');
      this.patientId = params.get('patient_id');
      this.numeroHistoriaClinica = params.get('numero_historia_clinica');

      if (this.patientId) {
        // this.loadDiagnostic(this.patientId);
      }
    });
  }

  /**
   * Sanitiza una URL antes de ser utilizada en la vista.
   * @param url URL a sanitizar.
   * @returns URL segura o null si no es válida.
   */
  private sanitizeUrl(url: string | null): SafeResourceUrl | null {
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

  /**
   * Carga el diagnóstico del paciente.
   * @param patientId ID del paciente.
   */
  loadDiagnostic(patientId: string): void {
    this.userService.getDiagnostic(patientId).subscribe((response: any) => {
      this.diagnosticForm.patchValue({
        title: response.title,
        description: response.description
      });
      this.diagnosticLoaded = true;
    }, error => {
      console.error('Error loading diagnostic:', error);
      this.toastr.error('Error loading diagnostic', 'Error');
    });
  }

  /**
   * Guarda el diagnóstico editado del paciente.
   */
  saveDiagnostic(): void {
    if (this.diagnosticForm.valid && this.patientId) {
      const body = {
        patient_id: this.patientId,
        title: this.diagnosticForm.value.title,
        description: this.diagnosticForm.value.description
      };

      this.userService.updateDiagnostic(body).subscribe(() => {
        this.toastr.success('Diagnóstico actualizado exitosamente', 'Éxito');
      }, error => {
        console.error('Error updating diagnostic:', error);
        this.toastr.error('Error updating diagnostic', 'Error');
      });
    }
  }

  /**
   * Envía la retroalimentación del usuario sobre la precisión de la IA.
   */
  submitFeedback(): void {
    if (this.feedbackForm.valid && this.patientId) {
      const feedback = this.feedbackForm.value;
      this.userService.submitFeedback(this.patientId, feedback).subscribe(() => {
        this.toastr.success('Retroalimentación enviada exitosamente', 'Éxito');
      }, error => {
        console.error('Error al enviar la retroalimentación:', error);
        this.toastr.error('Error al enviar la retroalimentación', 'Error');
      });
    }
  }

  /**
   * Envía un reporte médico con imágenes y retroalimentación.
   */
  sendReport(): void {
    if (this.feedbackForm.valid && this.patientId) {
      const feedback = this.feedbackForm.value;
      const report = {
        patient_id: this.patientId,
        report_text2: this.reportText2,
        report_text5: this.reportText5,
        feedback: feedback,
        modalities_description: feedback.modalitiesDescription,
        graph2_image: '',
        graph5_image: ''
      };

      this.captureGraphAsImage('graph2').then(graph2Image => {
        report.graph2_image = graph2Image;

        this.captureGraphAsImage('graph5').then(graph5Image => {
          report.graph5_image = graph5Image;

          this.userService.sendReport(report).subscribe(() => {
            this.toastr.success('Reporte enviado exitosamente', 'Éxito');
          }, error => {
            console.error('Error al enviar el reporte:', error);
            this.toastr.error('Error al enviar el reporte', 'Error');
          });
        }).catch(error => {
          console.error('Error capturando graph5:', error);
          this.toastr.error('Error capturando graph5', 'Error');
        });
      }).catch(error => {
        console.error('Error capturando graph2:', error);
        this.toastr.error('Error capturando graph2', 'Error');
      });
    }
  }

  /**
   * Captura una gráfica en formato de imagen.
   * @param graphId ID del elemento HTML de la gráfica.
   * @returns Promesa con la imagen en formato Base64.
   */
  captureGraphAsImage(graphId: string): Promise<string> {
    const element = document.getElementById(graphId);
    if (!element) {
      return Promise.reject(`Element with id ${graphId} not found`);
    }
    return html2canvas(element).then(canvas => canvas.toDataURL('image/png'));
  }

  /**
   * Descarga el reporte en formato PDF.
   */
  downloadPDF(): void {
    if (this.patientId) {
      this.userService.saveReportToFile(this.patientId);
    } else {
      console.error('Patient ID not available');
    }
  }
}
