import {Component, NgIterable, OnInit} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatDialogActions} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MedicalReportService} from "../services/medical-resport-service.service";
import {ToastrService} from "ngx-toastr";
import {DetectionService} from "../services/detection.service";


@Component({
  selector: 'app-detection',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatTooltip,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './detection.component.html',
  styleUrl: './detection.component.scss'
})
export class DetectionComponent implements OnInit {
  selectedGraph: string = '';
  patientId: string = '';
  /** Opciones de gráficas disponibles */
  graphOptions = [
    { value: 'graph6', viewValue: 'Visualización Interactiva de Modalidades' },
    { value: 'graph3D', viewValue: 'Visualización Cerebral 3D' }
  ];
  htmlUrl6: SafeResourceUrl | null = null;
  htmlUrl3D: SafeResourceUrl | null = null;
  isCollapsed: boolean = false;
  //selectedFiles: FileList | null = null;
  selectedFiles: File[] = [];


  /** Indica si la gráfica 6 ha sido cargada */
  isGraph6Loaded: boolean = false;

  /** Indica si la gráfica 3D ha sido cargada */
  isGraph3DLoaded: boolean = false;

  prediccion_clasificacion: string = '';

  constructor( private route: ActivatedRoute,
               private  router : Router,
               private http: HttpClient,
               private medicalReportService: MedicalReportService,
               private sanitizer: DomSanitizer,
               private toastr: ToastrService,
               private detectionService: DetectionService,
               ) {


  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement; // Forzar el tipo a <input>

    if (!input.files || input.files.length === 0) {
      alert("No se seleccionaron archivos.");
      return;
    }

    this.selectedFiles = []

    if (this.selectedFiles) {


      for (let i = 0; i < input.files.length; i++) {
        if (input.files[i].name.endsWith('nii.gz')){
          this.selectedFiles.push(input.files[i])
        } else{
          console.log(`El archivo ${input.files[i].name} no es un .nii.gz`);
        }
      }

      console.log("Archivos seleccionados:", this.selectedFiles);

      // this.medicalReportService.uploadFiles(formData).subscribe(
      //   (response) => {
      //     this.toastr.success('Archivos subidos correctamente', 'Éxito');
      //     this.loadGraphs(patientIdControl.value);
      //   },
      //   (error) => {
      //     this.toastr.error('Error subiendo los archivos', 'Error');
      //   }
      // );

      this.uploadFiles()
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      this.toastr.error('No se seleccionaron archivos.');
      console.log('No has seleccionado archivos .nii.gz');
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => formData.append('files', file));
    formData.append('patient_id', this.patientId);

     this.medicalReportService.uploadFiles(formData).subscribe(
      (response) => {
        this.toastr.success('Archivos subidos correctamente', 'Éxito');
        this.loadGraphs(this.patientId);

        this.detectionService.detectionC(this.patientId).subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            this.toastr.success('Clasificacion realizada con exito', 'Éxito');
            // Verificar si la respuesta contiene la predicción y actualizar el texto
            if (response.message === 1 || response.message === "1") {
              this.prediccion_clasificacion = "El paciente tiene Cáncer Cerebral";
            } else if (response.message === 0 || response.message === "0") {
              this.prediccion_clasificacion = "El paciente NO tiene Cáncer Cerebral";
            } else {
              this.prediccion_clasificacion = "Resultado no válido";
            }
          },
          error: (error) => {
            console.error('Error en la detección:', error);
            this.toastr.error('Hubo un error en la clasificacion', 'Error');
          }
        });


      },
      (error) => {
        this.toastr.error('Error subiendo los archivos', 'Error');
      }
    )

    // this.detectionService.detectionC(this.patientId).subscribe({
    //   next: (response) => {
    //     console.log('Respuesta del servidor:', response);
    //     this.toastr.success('Clasificacion realizada con exito', 'Éxito');
    //     // Verificar si la respuesta contiene la predicción y actualizar el texto
    //     if (response.message === 1 || response.message === "1") {
    //       this.prediccion_clasificacion = "El paciente tiene Cáncer Cerebral";
    //     } else if (response.message === 0 || response.message === "0") {
    //       this.prediccion_clasificacion = "El paciente NO tiene Cáncer Cerebral";
    //     } else {
    //       this.prediccion_clasificacion = "Resultado no válido";
    //     }
    //   },
    //   error: (error) => {
    //     console.error('Error en la detección:', error);
    //     this.toastr.error('Hubo un error en la clasificacion', 'Error');
    //   }
    // });


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.patientId = params['patient_id'];

    });
  }

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
   * Navega a la sección de UI Components - Chips.
   */
  navigateToChips(): void {
    this.router.navigate(['ui-components/chips']);
  }

  saveDiagnostic() {

  }
}
