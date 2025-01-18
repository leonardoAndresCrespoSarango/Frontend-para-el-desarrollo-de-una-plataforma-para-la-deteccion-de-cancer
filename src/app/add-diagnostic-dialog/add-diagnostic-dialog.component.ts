import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MedicalReportService} from "../services/medical-resport-service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-diagnostic-dialog',
  templateUrl: './add-diagnostic-dialog.component.html',
})
export class AddDiagnosticDialogComponent implements OnInit{
  addDiagnosticForm: FormGroup;
  pdfUrl: string | null = null;
  selectedFiles: FileList | null = null;
  htmlUrl6: SafeResourceUrl | null = null;



  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private medicalReportService: MedicalReportService
  ) {
    this.addDiagnosticForm = this.fb.group({
      patient_id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('Parámetros recibidos:', params); // Verificar si el patient_id está presente
      const patientId = params['patient_id'];
      if (patientId) {
        this.addDiagnosticForm.patchValue({ patient_id: patientId });
      } else {
        console.error('No se recibió un patient_id en los parámetros.');
        this.toastr.error('El ID del paciente no está disponible.', 'Error');
      }
    });
  }




  onFileChange(event: Event) {
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
        console.error('Patient ID is missing');
        this.toastr.error('Patient ID is missing', 'Error');
        return;
      }

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.medicalReportService.uploadFiles(formData).subscribe(response => {
        console.log('Files uploaded successfully:', response);
        this.toastr.success('Files uploaded successfully', 'Success');

        // Llamada para generar la gráfica 6
        const patientId = patientIdControl.value;
        this.medicalReportService.predict6(patientId).subscribe(
          (graphResponse) => {
            if (graphResponse.html_url6) {
              this.htmlUrl6 = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.html_url6);
              this.toastr.success('Graph 6 generated successfully', 'Success');
            }
          },
          (error) => {
            console.error('Error generating Graph 6:', error);
            this.toastr.error('Error generating Graph 6', 'Error');
          }
        );
      }, error => {
        console.error('Error uploading files:', error);
        this.toastr.error('Error uploading files', 'Error');
      });
    }


  }

  uploadFiles() {

    if (this.selectedFiles) {
      const formData = new FormData();
      const patientIdControl = this.addDiagnosticForm.get('patient_id');

      if (patientIdControl && patientIdControl.value) {
        formData.append('patient_id', patientIdControl.value);
      } else {
        console.error('Patient ID is missing');
        this.toastr.error('Patient ID is missing', 'Error');
        return;
      }

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.medicalReportService.uploadFiles(formData).subscribe(response => {
        console.log('Files uploaded successfully:', response);
        this.toastr.success('Files uploaded successfully', 'Success');
      }, error => {
        console.error('Error uploading files:', error);
        this.toastr.error('Error uploading files', 'Error');
      });
    }
  }
  saveDiagnostic(): void {
    if (this.addDiagnosticForm.valid) {
      const diagnosticData = this.addDiagnosticForm.value;

      this.medicalReportService.addDiagnostic(diagnosticData).subscribe(
        () => {
          this.toastr.success('Diagnóstico creado exitosamente', 'Éxito');
        },
        (error) => {
          console.error('Error creando el diagnóstico:', error);
          this.toastr.error('Error creando el diagnóstico', 'Error');
        }
      );
    } else {
      this.toastr.warning('Por favor, complete todos los campos', 'Advertencia');
    }
  }
  /*saveDiagnosticWithFiles(): void {
    if (this.addDiagnosticForm.valid) {
      const diagnosticData = this.addDiagnosticForm.value;

      // Guardar diagnóstico
      this.medicalReportService.addDiagnostic(diagnosticData).subscribe(
        () => {
          this.toastr.success('Diagnóstico creado exitosamente', 'Éxito');

          // Subir archivos si existen
          if (this.selectedFiles) {
            const formData = new FormData();
            formData.append('patient_id', diagnosticData.patient_id);

            for (let i = 0; i < this.selectedFiles.length; i++) {
              formData.append('files', this.selectedFiles[i]);
            }

            this.medicalReportService.uploadFiles(formData).subscribe(
              (response) => {
                console.log('Archivos subidos exitosamente:', response);
                this.toastr.success('Archivos subidos exitosamente', 'Éxito');

                // Generar la gráfica 6 después de subir los archivos
                this.medicalReportService.predict6(diagnosticData.patient_id).subscribe(
                  (graphResponse) => {
                    if (graphResponse.html_url6) {
                      this.htmlUrl6 = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.html_url6);
                      this.toastr.success('Gráfica generada exitosamente', 'Éxito');
                    }
                  },
                  (error) => {
                    console.error('Error generando la gráfica:', error);
                    this.toastr.error('Error generando la gráfica', 'Error');
                  }
                );
              },
              (error) => {
                console.error('Error subiendo archivos:', error);
                this.toastr.error('Error subiendo archivos', 'Error');
              }
            );
          }
        },
        (error) => {
          console.error('Error creando el diagnóstico:', error);
          this.toastr.error('Error creando el diagnóstico', 'Error');
        }
      );
    } else {
      this.toastr.warning('Por favor, complete todos los campos', 'Advertencia');
    }
  }*/



}
