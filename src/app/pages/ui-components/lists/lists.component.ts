import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { MedicalReportService } from '../../../services/medical-resport-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class AppListsComponent {
  medicalReportForm: FormGroup;
  selectedFiles: FileList | null = null;
  videoUrl: string | null = null;
  uploadVideoUrl: string | null = null;
  classes = [
    { name: 'Clase 1', color: '#FF0000' },
    { name: 'Clase 2', color: '#00FF00' },
    { name: 'Clase 3', color: '#0000FF' },
    { name: 'Clase 4', color: '#FFFF00' },
    // Agrega más clases según sea necesario
  ];
  constructor(
    private fb: FormBuilder,
    private medicalReportService: MedicalReportService,
    private toastr: ToastrService
  ) {
    this.medicalReportForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      patientId: ['', Validators.required],
      diagnosis: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }
  }

  uploadFiles() {
    if (this.selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('files', this.selectedFiles[i]);
      }

      this.medicalReportService.uploadFiles(formData).subscribe(response => {
        console.log('Files uploaded successfully:', response);
        this.toastr.success('Files uploaded successfully', 'Success');
        if (response && response.video_url) {
          this.uploadVideoUrl = response.video_url;
        }
      }, error => {
        console.error('Error uploading files:', error);
        this.toastr.error('Error uploading files', 'Error');
      });
    }
  }

  onSubmit() {
    if (this.medicalReportForm.valid) {
      const formData = JSON.stringify(this.medicalReportForm.value);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.medicalReportService.predict(formData).subscribe(response => {
        console.log('Prediction response:', response);
        this.toastr.success('Prediction successful', 'Success');
        if (response && response.video_url) {
          this.videoUrl = response.video_url;
        }
      }, error => {
        console.error('Error during prediction:', error);
        this.toastr.error('Error during prediction', 'Error');
      });
    }
  }

  changeSpeed(video: HTMLVideoElement, speed: number) {
    video.playbackRate = speed;
  }
}
