import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<AddDiagnosticDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicalReportService: MedicalReportService
  ) {
    this.addDiagnosticForm = this.fb.group({
      patient_id: [data.patient_id, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {

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


  onCancel(): void {
    this.dialogRef.close();
  }



  onSave(): void {
    if (this.addDiagnosticForm.valid) {
      this.dialogRef.close(this.addDiagnosticForm.value);
    }
  }

  onViewPdf(): void {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
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
          this.dialogRef.close();
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

}
