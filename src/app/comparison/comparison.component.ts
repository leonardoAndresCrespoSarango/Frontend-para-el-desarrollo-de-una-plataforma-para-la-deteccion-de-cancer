import {Component, OnInit} from '@angular/core';
import {MedicalReportService} from "../services/medical-resport-service.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
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
export class ComparisonComponent implements OnInit{
  selectedFiles: FileList | null = null;
  htmlUrlS: SafeResourceUrl | null = null;
  isGraphSLoaded: boolean = false;


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private medicalReportService: MedicalReportService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('Parámetros recibidos:', params); // Verificar si el patient_id está presente
      const patientId = params['patient_id'];
      console.log(patientId);
    });
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = input.files;
    }

    // Aquí asegúrate de tener el patientId
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


  loadGraphs(patientId: string): void {
    this.isGraphSLoaded = false;

    this.medicalReportService.predictSeg(patientId).subscribe(
      (graphResponse) => {
        console.log('Respuesta de la API:', graphResponse);
        if (graphResponse.htmlUrlS) {
          this.htmlUrlS = this.sanitizer.bypassSecurityTrustResourceUrl(graphResponse.htmlUrlS);
          this.isGraphSLoaded = true;
          this.toastr.success('Gráfica Segmentacion generada exitosamente', 'Éxito');
        } else {
          this.toastr.warning('No se recibió la URL de la gráfica.', 'Advertencia');
        }
      },
      (error) => {
        console.error('Error cargando la gráfica:', error);
        this.toastr.error('Error generando la gráfica Segmentacion', 'Error');
      }
    );


  }
  navigateToChips(): void {
    this.router.navigate(['ui-components/chips']);
  }

}
