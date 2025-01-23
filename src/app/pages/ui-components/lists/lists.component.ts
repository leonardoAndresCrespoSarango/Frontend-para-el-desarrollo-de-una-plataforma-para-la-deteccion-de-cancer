import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MedicalReportService } from '../../../services/medical-resport-service.service';
import { ToastrService } from 'ngx-toastr';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent implements OnInit {
  htmlUrl1: SafeResourceUrl | null = null;
  htmlUrl2: SafeResourceUrl | null = null;
  htmlUrl3: SafeResourceUrl | null = null;
  htmlUrl4: SafeResourceUrl | null = null;
  htmlUrl5: SafeResourceUrl | null = null;
  htmlUrl6: SafeResourceUrl | null = null;
  reportText2: string | null = null;
  reportText5: string | null = null;
  patientId: string | null = null;
  numeroHistoriaClinica: string | null = null;
  diagnosticForm: FormGroup;
  feedbackForm: FormGroup;
  diagnosticLoaded = false;
  selectedGraph: string | null = 'graph1';
  pdfUrl: string | null = null;


  graphOptions = [
    { value: 'graph1', viewValue: 'Visualización Cerebral 3D' },
    //{ value: 'graph3', viewValue: 'Visualización Interactiva de Rebanadas' },
    //{ value: 'graph4', viewValue: 'Clasificación de Rebanadas' },
    { value: 'graph6', viewValue: 'Visualización Interactiva de Modalidades' }
  ];

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const htmlUrl1 = params.get('html_url1');
      const htmlUrl2 = params.get('html_url2');
      //const htmlUrl3 = params.get('html_url3');
      //const htmlUrl4 = params.get('html_url4');
      //const htmlUrl5 = params.get('html_url5');
      const htmlUrl6 = params.get('html_url6');
      this.reportText2 = params.get('report_text2');
      this.reportText5 = params.get('report_text5');
      if (htmlUrl1) {
        this.htmlUrl1 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl1);
      }
      if (htmlUrl2) {
        this.htmlUrl2 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl2);
      }
      /*if (htmlUrl3) {
        this.htmlUrl3 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl3);
      }
      if (htmlUrl4) {
        this.htmlUrl4 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl4);
      }
      if (htmlUrl5) {
        this.htmlUrl5 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl5);
      }*/
      if (htmlUrl6) {
        this.htmlUrl6 = this.sanitizer.bypassSecurityTrustResourceUrl(htmlUrl6);
      }
      this.patientId = params.get('patient_id');
      this.numeroHistoriaClinica = params.get('numero_historia_clinica');
      if (this.patientId) {
        //this.loadDiagnostic(this.patientId);
      }
    });
  }

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

  sendReport(): void {
    if (this.feedbackForm.valid && this.patientId) {
      const feedback = this.feedbackForm.value;
      const report = {
        patient_id: this.patientId,
        report_text2: this.reportText2,
        report_text5: this.reportText5,
        feedback: feedback,
        modalities_description: feedback.modalitiesDescription,
        graph2_image: '',  // Inicializa con una cadena vacía
        graph5_image: ''   // Inicializa con una cadena vacía
      };

      this.captureGraphAsImage('graph2', 'graph2Image').then(graph2Image => {
        report.graph2_image = graph2Image;  // Asigna la imagen capturada

        this.captureGraphAsImage('graph5', 'graph5Image').then(graph5Image => {
          report.graph5_image = graph5Image;  // Asigna la imagen capturada

          this.userService.sendReport(report).subscribe(() => {
            this.toastr.success('Reporte enviado exitosamente', 'Éxito');
          }, error => {
            console.error('Error al enviar el reporte:', error);
            this.toastr.error('Error al enviar el reporte', 'Error');
          });
        }).catch(error => {
          console.error('Error capturing graph5:', error);
          this.toastr.error('Error capturing graph5', 'Error');
        });
      }).catch(error => {
        console.error('Error capturing graph2:', error);
        this.toastr.error('Error capturing graph2', 'Error');
      });
    }
  }

  captureGraphAsImage(graphId: string, imageName: string): Promise<string> {
    const element = document.getElementById(graphId);
    if (!element) {
      return Promise.reject(`Element with id ${graphId} not found`);
    }
    return html2canvas(element).then(canvas => {
      return canvas.toDataURL('image/png');
    });

  }
  downloadPDF(): void {
    if (this.patientId) {
      this.userService.saveReportToFile(this.patientId);
    } else {
      console.error('Patient ID not available');
    }
  }

}

