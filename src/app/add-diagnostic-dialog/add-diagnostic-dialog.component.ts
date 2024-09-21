import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MedicalReportService} from "../services/medical-resport-service.service";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-diagnostic-dialog',
  templateUrl: './add-diagnostic-dialog.component.html',
})
export class AddDiagnosticDialogComponent {
  addDiagnosticForm: FormGroup;
  pdfUrl: string | null = null;
  selectedFiles: FileList | null = null;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDiagnosticDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private medicalReportService: MedicalReportService
  ) {
    this.addDiagnosticForm = this.fb.group({
      patient_id: [data.patient_id, Validators.required],
      patient_name: [data.patient_name, Validators.required],
      patient_age: [data.patient_age, Validators.required],
      patient_gender: [data.patient_gender, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onGeneratePDF(): void {
    if (this.addDiagnosticForm.valid) {
      this.medicalReportService.generateDiagnosticPDF(this.addDiagnosticForm.value).subscribe(
        response => {
          this.pdfUrl = response.pdf_url;
        },
        error => {
          console.error('Error generating PDF:', error);
        }
      );
    }
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

}
